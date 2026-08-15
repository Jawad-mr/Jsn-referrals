import { verifyAccessToken } from "../utils/token.js";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "You need to sign in to continue." });
    }

    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.id);

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Your session is no longer valid. Please sign in again." });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Your session has expired. Please sign in again." });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "This action requires admin access." });
  }
  next();
}
