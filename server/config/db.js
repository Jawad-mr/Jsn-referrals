import mongoose from "mongoose";

// Render free tier spins the service down after ~15 minutes idle, and Atlas
// M0 clusters can pause too. The very first request after a cold start can
// arrive before Mongo has finished connecting, so instead of failing fast we
// retry a few times with backoff before giving up.
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

let isConnecting = false;
let connectionPromise = null;

async function attemptConnect(retriesLeft = MAX_RETRIES) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Keep the pool small - free tier clusters cap total connections,
      // and Render free dynos only ever serve one request at a time anyway.
      maxPoolSize: 5,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });
    console.log("[db] connected to MongoDB");
  } catch (err) {
    if (retriesLeft > 0) {
      console.warn(
        `[db] connection failed (${err.message}), retrying in ${RETRY_DELAY_MS}ms... (${retriesLeft} left)`
      );
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      return attemptConnect(retriesLeft - 1);
    }
    throw err;
  }
}

export function connectDB() {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (isConnecting) return connectionPromise;

  isConnecting = true;
  connectionPromise = attemptConnect().finally(() => {
    isConnecting = false;
  });
  return connectionPromise;
}

// Middleware form: guarantees a live connection before a route handler runs.
// This is what actually saves you from cold-start 500s - every request
// re-checks the connection state instead of assuming server startup already
// connected successfully.
export async function ensureDBConnected(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
    next();
  } catch (err) {
    res.status(503).json({
      message: "Database is waking up, please retry in a few seconds.",
    });
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("[db] disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("[db] error:", err.message);
});
