import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
  {
    referrer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

    // Lead details - the person/business the referrer is introducing
    leadName: { type: String, required: true, trim: true },
    leadEmail: { type: String, trim: true, lowercase: true },
    leadPhone: { type: String, required: true, trim: true },
    serviceInterested: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "App Development",
        "Custom Software",
        "Bakery POS App",
        "Restaurant POS App",
        "Gym Management App",
        "Hotel Management App",
        "AI Chatbot",
        "AI Solutions",
        "UI/UX Design",
        "SEO Services",
        "Graphic Designing",
        "Video Editing",
        "Digital Marketing",
        "Educational Consultancy",
        "E-Books",
        "Other",
      ],
    },
    notes: { type: String, trim: true, maxlength: 1000 },

    // Lifecycle: new -> contacted -> converted (won, commission owed) or lost
    status: {
      type: String,
      enum: ["new", "contacted", "converted", "lost"],
      default: "new",
    },

    // Filled in by admin once a deal closes
    projectValue: { type: Number, default: 0 }, // total INR value of the closed project
    commissionPercent: { type: Number, default: 10 },
    commissionAmount: { type: Number, default: 0 }, // projectValue * commissionPercent / 100

    // Payout tracking, separate from lead status - a converted referral still
    // needs its commission approved and then paid out
    payoutStatus: {
      type: String,
      enum: ["not_applicable", "pending", "approved", "paid"],
      default: "not_applicable",
    },

    adminNote: { type: String, trim: true, maxlength: 1000 },
    convertedAt: { type: Date },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

referralSchema.index({ referrer: 1, status: 1 });

export default mongoose.model("Referral", referralSchema);
