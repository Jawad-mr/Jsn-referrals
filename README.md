# Jsn Creative — Refer & Earn

A MERN referral program web app for Jsn Creative. Referrers sign up, get a
personal referral link, submit leads, track earnings, and grab ready-made
social media materials. Admin approves conversions and payouts from a
dashboard.

## Stack

- **Frontend**: React (Vite) + React Router + Tailwind CSS, deployed to **Vercel** (free)
- **Backend**: Node.js + Express + JWT auth, deployed to **Render** (free web service)
- **Database**: MongoDB Atlas (free M0 cluster)

## Project structure

```
jsn-referral/
├── client/     # React frontend
└── server/     # Express API
```

## Local setup

### 1. Backend

```bash
cd server
cp .env.example .env    # fill in your real values
npm install
npm run dev              # http://localhost:5000
```

Then seed the first admin account and starter materials:

```bash
node seed.js
```

### 2. Frontend

```bash
cd client
cp .env.example .env    # set VITE_API_URL=http://localhost:5000
npm install
npm run dev              # http://localhost:5173
```

## Pages included

**Public**
- `/` — Landing page (hero, live earnings ticker, how it works, leaderboard, materials preview, FAQ)
- `/join` — Sign up (captures `?ref=CODE` from shared links)
- `/login` — Sign in

**Referrer dashboard** (`/dashboard/*`)
- Overview — referral link, quick stats, recent activity
- New referral — submit a lead
- My referrals — full history with status filters
- Materials — ready-made banners/captions to copy and share
- Earnings — commission breakdown and payout status

**Admin dashboard** (`/admin/*`, requires `role: admin`)
- Overview — program-wide stats
- Referrals — update lead status, enter project value/commission %, approve and mark payouts paid
- Referrers — list of everyone enrolled with earnings
- Materials — add/remove shareable content

## How the referral/commission flow works

1. Referrer submits a lead (or shares their link, and the person signs up with `?ref=code`).
2. Admin updates the lead's status: `new → contacted → converted` (or `lost`).
3. On `converted`, admin enters the **project value** and **commission %** — the commission amount is calculated automatically and added to the referrer's **pending** balance.
4. Admin **approves** the payout — it moves from pending to the referrer's **total earnings**.
5. Admin marks it **paid** once the money is actually sent (UPI/bank) — it moves to **paid out**.

## Deploying on free tiers — and the tricks used to keep it fast & reliable

Running on Render's free web service + MongoDB Atlas free (M0) tier comes
with two well-known drawbacks. Here's what this project already does about
each:

### 1. Render free services "sleep" after ~15 minutes of no traffic

The first request after that wakes it back up, but takes 20–50 seconds.

**What's built in:**
- A self-ping every 10 minutes (`SERVER_URL` env var, see `server/index.js`) keeps the service warm *while it's already receiving some traffic*, so it doesn't cold-start between normal user visits during the day.
- The frontend shows a friendly **"waking things up"** screen instead of a blank page or an error while the backend cold-starts (`client/src/components/BootScreen.jsx`).
- The Express server now **listens immediately** on boot instead of waiting for MongoDB to connect first — so the health check and static responses come back fast even if the DB is still connecting.

**What you should add for true 24/7 uptime (free, ~5 min setup):**
Self-pinging alone won't keep Render awake through the night with zero
traffic — Render's own limits still apply. Pair it with a free external
uptime pinger that hits `/api/health` every 5–10 minutes:
- [UptimeRobot](https://uptimerobot.com) (free tier, 5-minute checks) — most popular choice
- [cron-job.org](https://cron-job.org) (free, more frequent intervals)

Point either one at: `https://your-backend.onrender.com/api/health`

### 2. MongoDB Atlas free tier can be slow to respond to the very first query after idling

**What's built in:**
- `server/config/db.js` retries the connection up to 5 times with backoff instead of failing on the first attempt.
- Every API route runs through `ensureDBConnected` middleware, which re-checks the connection state **per request** and reconnects if needed — so a request arriving right after a cold start doesn't just 500, it waits and connects.
- Connection pool is deliberately small (`maxPoolSize: 5`) since Atlas free tier caps total connections and Render's free dyno only handles one request at a time anyway.

### 3. Cross-origin cookies (Vercel frontend ↔ Render backend, different domains)

- Refresh tokens use `SameSite=None; Secure` cookies so they survive the cross-domain hop (see `server/utils/token.js`).
- Access tokens are short-lived (15 min) and silently refreshed via axios interceptors (`client/src/lib/api.js`) — so users don't get logged out just because the token expired.

## Deployment steps

### MongoDB Atlas
1. Create a free M0 cluster.
2. Create a database user + password.
3. Network Access → allow `0.0.0.0/0` (required since Render's IPs aren't static on the free tier).
4. Copy the connection string into `MONGODB_URI`.

### Render (backend)
1. New Web Service → connect this repo, root directory `server`.
2. Build command: `npm install` — Start command: `npm start`.
3. Add all env vars from `.env.example` (or use the included `render.yaml`).
4. After first deploy, run `node seed.js` once (Render Shell, or run locally against the same `MONGODB_URI`) to create the admin account.
5. Set `SERVER_URL` to your Render URL once you know it, then redeploy so the keep-alive ping targets the right address.

### Vercel (frontend)
1. New Project → import this repo, root directory `client`.
2. Framework preset: Vite.
3. Env var: `VITE_API_URL` = your Render backend URL (no trailing slash).
4. Deploy.
5. Go back to Render and set `CLIENT_URL` to your Vercel URL (comma-separated if you have more than one, e.g. a preview + production domain), then redeploy the backend so CORS allows it.

## Color system

Dark base (`#0B0C0F`) with a signature yellow accent (`#F5C518`) used
deliberately — CTAs, earnings figures, active states — plus amber, mint
(success/paid), and a mono typeface for money figures and referral codes to
give the dashboard a "ledger" feel. Fonts: Space Grotesk (display), Inter
(body), JetBrains Mono (figures/codes).
