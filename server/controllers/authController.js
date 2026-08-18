import User from "../models/User.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  refreshCookieOptions,
} from "../utils/token.js";

export async function register(req, res) {
  try {
    const { name, email, phone, password, refCode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    let referredBy = null;
    if (refCode) {
      const referrer = await User.findOne({ referralCode: refCode.toLowerCase() });
      if (referrer) referredBy = referrer._id;
    }

    const user = await User.create({ name, email, phone, password, referredBy });

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

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
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
