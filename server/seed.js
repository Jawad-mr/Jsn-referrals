// Run once after first deploy: node seed.js
// Creates the admin account from .env values and a few starter materials.
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";
import Material from "./models/Material.js";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("[seed] connected");

  const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || "Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
    console.log(`[seed] admin created: ${process.env.ADMIN_EMAIL}`);
  } else {
    console.log("[seed] admin already exists, skipping");
  }

  const materialCount = await Material.countDocuments();
  if (materialCount === 0) {
    await Material.insertMany([
      {
        title: "Instagram Story - Refer & Earn",
        type: "story",
        captionText:
          "Know a business that needs a website, app, or AI automation? Refer them to Jsn Creative and earn a % commission when they sign on. Link in bio.",
        tags: ["instagram", "story"],
        order: 1,
      },
      {
        title: "WhatsApp Status Caption",
        type: "caption",
        captionText:
          "I've been referring businesses to Jsn Creative (web, app & AI studio) and earning commission on every project that closes. If you know someone who needs a website or app built, DM me your referral link.",
        tags: ["whatsapp"],
        order: 2,
      },
      {
        title: "LinkedIn Post Caption",
        type: "caption",
        captionText:
          "Jsn Creative builds websites, apps, POS systems and AI automation for businesses across Karnataka and beyond. I'm part of their referral program - if you or someone in your network needs custom software, I'd love to make an introduction (and yes, I earn a commission for it).",
        tags: ["linkedin"],
        order: 3,
      },
    ]);
    console.log("[seed] sample materials created");
  }

  await mongoose.disconnect();
  console.log("[seed] done");
}

seed().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
