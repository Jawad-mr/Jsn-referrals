import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// Standard 32-byte key derived from environment secret or a strong default fallback
const SECRET = process.env.ENCRYPTION_KEY || process.env.JWT_SECRET || "jsn-creative-referral-secure-encryption-key-32b";
const KEY = crypto.createHash("sha256").update(String(SECRET)).digest();
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16; // 16 bytes for AES GCM

/**
 * Encrypts a plaintext string into a safe hex representation (iv:authTag:encryptedText).
 * @param {string} text Plaintext to encrypt
 * @returns {string} Encrypted string
 */
export function encryptData(text) {
  if (!text || typeof text !== "string") return text;
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    let encrypted = cipher.update(text.trim(), "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");
    return `${iv.toString("hex")}:${authTag}:${encrypted}`;
  } catch (err) {
    console.error("[crypto] Encryption error:", err);
    return text;
  }
}

/**
 * Decrypts an encrypted hex string (iv:authTag:encryptedText) back into plaintext.
 * @param {string} cipherText Encrypted string
 * @returns {string} Decrypted plaintext
 */
export function decryptData(cipherText) {
  if (!cipherText || typeof cipherText !== "string") return cipherText;
  // If it's not formatted as iv:authTag:encrypted, return as-is (e.g. legacy plain data)
  const parts = cipherText.split(":");
  if (parts.length !== 3) return cipherText;

  try {
    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (err) {
    console.error("[crypto] Decryption error:", err);
    return cipherText;
  }
}

/**
 * Masks a sensitive UPI ID or Account Number for secure UI display (e.g., "ja***@okhdfcbank" or "******1234").
 * @param {string} text Plaintext or decrypted value
 * @returns {string} Masked string
 */
export function maskSensitive(text) {
  if (!text) return "";
  if (text.includes("@")) {
    const [handle, domain] = text.split("@");
    if (handle.length <= 2) return `**@${domain}`;
    return `${handle.slice(0, 2)}***@${domain}`;
  }
  if (text.length <= 4) return "****";
  return `****${text.slice(-4)}`;
}
