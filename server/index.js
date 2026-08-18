import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import { connectDB, ensureDBConnected } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Tell Express it is behind a reverse proxy (Render load balancer)
app.set("trust proxy", 1);

// --- Core middleware ---
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // allow no-origin requests (curl, server-to-server, health checks)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Basic rate limiting - protects the free-tier instance (and free Atlas
// cluster) from being overwhelmed. Auth routes get a tighter limit.
const generalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30 });
app.use("/api/", generalLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// Health check - deliberately excluded from DB-connect middleware so it
// stays fast and reliable, used by uptime pingers to keep the Render
// instance from spinning down.
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// From here on, every request first guarantees a live Mongo connection.
// This is the key trick for Atlas + Render free tier: instead of connecting
// once at boot and hoping it stays alive, we lazily reconnect per-request.
app.use("/api", ensureDBConnected);

app.use("/api/auth", authRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/materials", materialRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Something went wrong." });
});

async function start() {
  // Listen immediately - don't let a slow or failing Mongo connection delay
  // (or block) the HTTP server from coming up. Routes that need the DB are
  // protected by ensureDBConnected, which connects lazily per-request.
  app.listen(PORT, () => {
    console.log(`[server] listening on port ${PORT}`);
  });

  connectDB().catch((err) => {
    console.error("[server] initial DB connection failed, will retry on first request:", err.message);
  });

  // --- Free-tier "don't sleep" trick ---
  // Render's free web services spin down after ~15 min with no inbound
  // traffic, then take 30-60s to cold-start the next request. Self-pinging
  // every 10 minutes keeps this instance warm DURING business hours use,
  // and costs nothing. It cannot keep the service alive 24/7 by itself
  // (Render still enforces its own limits) - pair this with an external
  // uptime pinger (see README) for real 24/7 coverage.
  if (process.env.SERVER_URL) {
    const PING_INTERVAL_MS = 10 * 60 * 1000;
    setInterval(() => {
      fetch(`${process.env.SERVER_URL}/api/health`).catch(() => {
        // Ignore failures - this is best-effort keep-alive, not critical path
      });
    }, PING_INTERVAL_MS);
  }
}

start().catch((err) => {
  console.error("[server] failed to start:", err);
  process.exit(1);
});
