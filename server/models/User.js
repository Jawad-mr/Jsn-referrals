import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String, required: true, select: false },

    role: { type: String, enum: ["referrer", "admin"], default: "referrer" },

    // Unique short code used in every referral link: jsncreative.studio/r/ab3xk9
    referralCode: {
      type: String,
      unique: true,
      default: () => nanoid(7).toLowerCase(),
    },

    // Who referred THIS user in, if anyone (referrer chains, optional)
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    // Running totals, denormalized for fast dashboard reads
    totalEarnings: { type: Number, default: 0 }, // lifetime approved earnings (INR)
    pendingEarnings: { type: Number, default: 0 }, // submitted, not yet approved
    paidOut: { type: Number, default: 0 }, // amount actually paid to referrer

    payoutMethod: {
      upiId: { type: String, trim: true },
      bankAccountName: { type: String, trim: true },
      bankAccountNumber: { type: String, trim: true },
      bankIFSC: { type: String, trim: true },
    },

    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    role: this.role,
    referralCode: this.referralCode,
    totalEarnings: this.totalEarnings,
    pendingEarnings: this.pendingEarnings,
    paidOut: this.paidOut,
    createdAt: this.createdAt,
  };
};

export default mongoose.model("User", userSchema);
