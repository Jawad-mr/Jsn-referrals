import Referral from "../models/Referral.js";
import User from "../models/User.js";

export async function getAllReferrals(req, res) {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const referrals = await Referral.find(filter)
      .populate("referrer", "name email phone referralCode")
      .sort({ createdAt: -1 });
    res.json({ referrals });
  } catch (err) {
    res.status(500).json({ message: "Could not load referrals." });
  }
}

// Update lead status (new -> contacted -> converted/lost). When marking
// converted, admin also supplies projectValue + commissionPercent, which
// computes the commission owed and puts it into the referrer's pending balance.
export async function updateReferralStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, projectValue, commissionPercent, adminNote } = req.body;

    const referral = await Referral.findById(id);
    if (!referral) return res.status(404).json({ message: "Referral not found." });

    const wasConverted = referral.status === "converted";

    if (status) referral.status = status;
    if (adminNote !== undefined) referral.adminNote = adminNote;

    if (status === "converted") {
      referral.projectValue = Number(projectValue) || 0;
      referral.commissionPercent = Number(commissionPercent) || referral.commissionPercent;
      referral.commissionAmount = Math.round(
        (referral.projectValue * referral.commissionPercent) / 100
      );
      referral.payoutStatus = "pending";
      referral.convertedAt = new Date();

      // Only add to pending once - guard against double-adding if admin
      // re-saves an already-converted referral.
      if (!wasConverted) {
        await User.findByIdAndUpdate(referral.referrer, {
          $inc: { pendingEarnings: referral.commissionAmount },
        });
      }
    }

    if (status === "lost" && wasConverted) {
      // Reverse out any pending commission if a converted deal falls through
      await User.findByIdAndUpdate(referral.referrer, {
        $inc: { pendingEarnings: -referral.commissionAmount },
      });
      referral.payoutStatus = "not_applicable";
      referral.commissionAmount = 0;
    }

    await referral.save();
    res.json({ referral });
  } catch (err) {
    res.status(500).json({ message: "Could not update referral." });
  }
}

// Approve a converted referral's commission: moves amount from pending to
// confirmed total earnings (still not yet paid out in cash).
export async function approvePayout(req, res) {
  try {
    const { id } = req.params;
    const referral = await Referral.findById(id);
    if (!referral) return res.status(404).json({ message: "Referral not found." });
    if (referral.payoutStatus !== "pending") {
      return res.status(400).json({ message: "Only pending commissions can be approved." });
    }

    referral.payoutStatus = "approved";
    await referral.save();

    await User.findByIdAndUpdate(referral.referrer, {
      $inc: {
        pendingEarnings: -referral.commissionAmount,
        totalEarnings: referral.commissionAmount,
      },
    });

    res.json({ referral });
  } catch (err) {
    res.status(500).json({ message: "Could not approve payout." });
  }
}

// Mark as actually paid out (money sent via UPI/bank)
export async function markPaid(req, res) {
  try {
    const { id } = req.params;
    const referral = await Referral.findById(id);
    if (!referral) return res.status(404).json({ message: "Referral not found." });
    if (referral.payoutStatus !== "approved") {
      return res.status(400).json({ message: "Only approved commissions can be marked paid." });
    }

    referral.payoutStatus = "paid";
    referral.paidAt = new Date();
    await referral.save();

    await User.findByIdAndUpdate(referral.referrer, {
      $inc: { paidOut: referral.commissionAmount },
    });

    res.json({ referral });
  } catch (err) {
    res.status(500).json({ message: "Could not mark as paid." });
  }
}

export async function getAllReferrers(req, res) {
  try {
    const referrers = await User.find({ role: "referrer" }).sort({ totalEarnings: -1 });
    res.json({ referrers });
  } catch (err) {
    res.status(500).json({ message: "Could not load referrers." });
  }
}

export async function getDashboardSummary(req, res) {
  try {
    const [totalReferrers, referrals] = await Promise.all([
      User.countDocuments({ role: "referrer" }),
      Referral.find(),
    ]);

    const summary = {
      totalReferrers,
      totalReferrals: referrals.length,
      newLeads: referrals.filter((r) => r.status === "new").length,
      converted: referrals.filter((r) => r.status === "converted").length,
      pendingPayoutAmount: referrals
        .filter((r) => r.payoutStatus === "pending")
        .reduce((sum, r) => sum + r.commissionAmount, 0),
      totalPaidOut: referrals
        .filter((r) => r.payoutStatus === "paid")
        .reduce((sum, r) => sum + r.commissionAmount, 0),
    };

    res.json({ summary });
  } catch (err) {
    res.status(500).json({ message: "Could not load dashboard summary." });
  }
}
