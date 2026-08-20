import Referral from "../models/Referral.js";
import User from "../models/User.js";

export async function submitReferral(req, res) {
  try {
    let { leadName, leadEmail, leadPhone, serviceInterested, notes } = req.body;

    if (!leadName || !leadPhone || !serviceInterested) {
      return res.status(400).json({ message: "Lead name, phone, and service are required." });
    }

    leadName = String(leadName).trim().slice(0, 100);
    leadEmail = leadEmail ? String(leadEmail).trim().toLowerCase().slice(0, 120) : "";
    leadPhone = String(leadPhone).trim().slice(0, 30);
    serviceInterested = String(serviceInterested).trim().slice(0, 150);
    notes = notes ? String(notes).trim().slice(0, 1000) : "";

    const referral = await Referral.create({
      referrer: req.user._id,
      leadName,
      leadEmail,
      leadPhone,
      serviceInterested,
      notes,
    });

    res.status(201).json({ referral });
  } catch (err) {
    console.error("[submitReferral] Error:", err);
    res.status(500).json({ message: "Could not submit your referral. Please try again." });
  }
}

export async function getMyReferrals(req, res) {
  try {
    const referrals = await Referral.find({ referrer: req.user._id }).sort({ createdAt: -1 });
    res.json({ referrals });
  } catch (err) {
    res.status(500).json({ message: "Could not load your referrals." });
  }
}

export async function getMyStats(req, res) {
  try {
    const referrals = await Referral.find({ referrer: req.user._id });
    const stats = {
      total: referrals.length,
      new: referrals.filter((r) => r.status === "new").length,
      contacted: referrals.filter((r) => r.status === "contacted").length,
      converted: referrals.filter((r) => r.status === "converted").length,
      lost: referrals.filter((r) => r.status === "lost").length,
      totalEarnings: req.user.totalEarnings,
      pendingEarnings: req.user.pendingEarnings,
      paidOut: req.user.paidOut,
    };
    res.json({ stats });
  } catch (err) {
    res.status(500).json({ message: "Could not load your stats." });
  }
}

// Public leaderboard - shows first names + earnings to create social proof,
// never emails/phones. This powers the "see how much people are earning"
// section on the public site.
export async function getLeaderboard(req, res) {
  try {
    const topEarners = await User.find({ role: "referrer", totalEarnings: { $gt: 0 } })
      .sort({ totalEarnings: -1 })
      .limit(10)
      .select("name totalEarnings");

    const leaderboard = topEarners.map((u) => {
      const parts = u.name.trim().split(" ");
      const masked =
        parts[0] +
        (parts[1] ? " " + parts[1][0] + "." : "");
      return { name: masked, totalEarnings: u.totalEarnings };
    });

    res.json({ leaderboard });
  } catch (err) {
    res.status(500).json({ message: "Could not load leaderboard." });
  }
}

// Public ticker feed - recent approved payouts, anonymized further, used for
// the scrolling marquee on the landing page.
export async function getRecentPayouts(req, res) {
  try {
    const recent = await User.find({ paidOut: { $gt: 0 } })
      .sort({ updatedAt: -1 })
      .limit(15)
      .select("name paidOut");

    const feed = recent.map((u) => {
      const n = u.name.trim();
      const masked = n[0] + "•".repeat(Math.max(2, n.length - 2)) + n[n.length - 1];
      return { name: masked, amount: u.paidOut };
    });

    res.json({ feed });
  } catch (err) {
    res.status(500).json({ message: "Could not load activity feed." });
  }
}
