import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["banner", "story", "caption", "video"],
      required: true,
    },
    // For banners/stories/video - a hosted image or video URL
    fileUrl: { type: String, trim: true },
    thumbnailUrl: { type: String, trim: true },
    // For captions, or as the suggested text that goes WITH a banner
    captionText: { type: String, trim: true, maxlength: 2000 },
    tags: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Material", materialSchema);
