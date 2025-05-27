const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ["short", "long"] },
  filePath: String, // For short-form
  url: String,      // For long-form
  price: { type: Number, default: 0 },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
}, 
{
  timestamps: true
});

module.exports = mongoose.model("Video", videoSchema);