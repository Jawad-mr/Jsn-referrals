import User from "../models/User.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  refreshCookieOptions,
} from "../utils/token.js";
import { encryptData, decryptData, maskSensitive } from "../utils/crypto.js";

// Valid UPI ID pattern: e.g. username@bank, 9876543210@paytm, name.surname@okaxis
const UPI_REGEX = /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/;

export async function register(req, res) {
  try {
    const { name, email, phone, password, refCode, acceptTerms } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }
    if (typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }
    if (acceptTerms === false) {
      return res.status(400).json({ message: "You must accept the Terms & Conditions to join." });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    let referredBy = null;
    if (refCode && typeof refCode === "string") {
      const referrer = await User.findOne({ referralCode: refCode.toLowerCase().trim() });
      if (referrer) referredBy = referrer._id;
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? String(phone).trim() : "",
      password,
      referredBy,
      termsAcceptedAt: new Date(),
    });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions());

    res.status(201).json({ user: user.toPublicJSON(), accessToken });
  } catch (err) {
    console.error("[register] Error:", err);
    res.status(500).json({ message: err.message || "Something went wrong creating your account. Please try again." });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }
    if (!user.isActive) {
      return res.status(403).json({ message: "This account has been deactivated." });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions());

    res.json({ user: user.toPublicJSON(), accessToken });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong signing you in. Please try again." });
  }
}

export async function refresh(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "Please sign in again." });

    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.id);
    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Please sign in again." });
    }

    const accessToken = signAccessToken(user);
    res.json({ user: user.toPublicJSON(), accessToken });
  } catch (err) {
    res.status(401).json({ message: "Your session has expired. Please sign in again." });
  }
}

export async function logout(req, res) {
  res.clearCookie("refreshToken", { ...refreshCookieOptions(), maxAge: 0 });
  res.json({ message: "Signed out." });
}

export async function getMe(req, res) {
  res.json({ user: req.user.toPublicJSON() });
}

/**
 * Returns detailed profile with decrypted / masked payment info for the authenticated user.
 */
export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user._id).select(
      "+payoutMethod.upiId +payoutMethod.bankAccountName +payoutMethod.bankAccountNumber +payoutMethod.bankIFSC"
    );
    if (!user) return res.status(404).json({ message: "User not found." });

    const rawUpi = user.payoutMethod?.upiId ? decryptData(user.payoutMethod.upiId) : "";
    const rawAccNum = user.payoutMethod?.bankAccountNumber ? decryptData(user.payoutMethod.bankAccountNumber) : "";
    const rawAccName = user.payoutMethod?.bankAccountName || "";
    const rawIfsc = user.payoutMethod?.bankIFSC || "";

    res.json({
      user: {
        ...user.toPublicJSON(),
        payoutMethod: {
          upiId: rawUpi,
          maskedUpiId: maskSensitive(rawUpi),
          bankAccountName: rawAccName,
          bankAccountNumber: rawAccNum,
          maskedAccountNumber: maskSensitive(rawAccNum),
          bankIFSC: rawIfsc,
          isConfigured: Boolean(rawUpi || rawAccNum),
          updatedAt: user.payoutMethod?.updatedAt || user.updatedAt,
        },
      },
    });
  } catch (err) {
    console.error("[getProfile] Error:", err);
    res.status(500).json({ message: "Failed to fetch profile." });
  }
}

/**
 * Updates profile details and encrypts sensitive UPI ID and bank info using AES-256-GCM.
 */
export async function updateProfile(req, res) {
  try {
    const { name, phone, upiId, bankAccountName, bankAccountNumber, bankIFSC } = req.body;

    const user = await User.findById(req.user._id).select(
      "+payoutMethod.upiId +payoutMethod.bankAccountName +payoutMethod.bankAccountNumber +payoutMethod.bankIFSC"
    );
    if (!user) return res.status(404).json({ message: "User not found." });

    if (name && typeof name === "string") {
      user.name = name.trim();
    }
    if (phone !== undefined) {
      user.phone = String(phone).trim();
    }

    if (!user.payoutMethod) {
      user.payoutMethod = {};
    }

    // Process UPI ID
    if (upiId !== undefined) {
      const cleanUpi = String(upiId).trim();
      if (cleanUpi.length > 0) {
        if (!UPI_REGEX.test(cleanUpi)) {
          return res.status(400).json({ message: "Invalid UPI ID format. Example: name@okaxis, 9876543210@paytm" });
        }
        // Encrypt with AES-256-GCM before saving to database
        user.payoutMethod.upiId = encryptData(cleanUpi);
      } else {
        user.payoutMethod.upiId = "";
      }
    }

    // Process optional Bank Details
    if (bankAccountName !== undefined) {
      user.payoutMethod.bankAccountName = String(bankAccountName).trim();
    }
    if (bankAccountNumber !== undefined) {
      const cleanAcc = String(bankAccountNumber).trim();
      user.payoutMethod.bankAccountNumber = cleanAcc ? encryptData(cleanAcc) : "";
    }
    if (bankIFSC !== undefined) {
      user.payoutMethod.bankIFSC = String(bankIFSC).trim().toUpperCase();
    }

    const isConfigured = Boolean(
      (user.payoutMethod.upiId && user.payoutMethod.upiId.length > 0) ||
      (user.payoutMethod.bankAccountNumber && user.payoutMethod.bankAccountNumber.length > 0)
    );
    user.hasPayoutDetails = isConfigured;
    user.payoutMethod.isConfigured = isConfigured;
    user.payoutMethod.isVerified = isConfigured;
    user.payoutMethod.updatedAt = new Date();
    await user.save();

    const rawUpi = user.payoutMethod.upiId ? decryptData(user.payoutMethod.upiId) : "";
    const rawAccNum = user.payoutMethod.bankAccountNumber ? decryptData(user.payoutMethod.bankAccountNumber) : "";

    res.json({
      message: "Profile updated successfully.",
      user: {
        ...user.toPublicJSON(),
        payoutMethod: {
          upiId: rawUpi,
          maskedUpiId: maskSensitive(rawUpi),
          bankAccountName: user.payoutMethod.bankAccountName || "",
          bankAccountNumber: rawAccNum,
          maskedAccountNumber: maskSensitive(rawAccNum),
          bankIFSC: user.payoutMethod.bankIFSC || "",
          isConfigured: Boolean(rawUpi || rawAccNum),
          updatedAt: user.payoutMethod.updatedAt,
        },
      },
    });
  } catch (err) {
    console.error("[updateProfile] Error:", err);
    res.status(500).json({ message: "Failed to update profile." });
  }
}

/**
 * Changes password securely after validating current password.
 */
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new passwords are required." });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters." });
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully." });
  } catch (err) {
    console.error("[changePassword] Error:", err);
    res.status(500).json({ message: "Failed to change password." });
  }
}
