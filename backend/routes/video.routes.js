const express = require("express");
const multer = require("multer");
const Video = require("../models/Video");
const path = require("path");

const router = express.Router();

// Multer config for short-form video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/videos"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== ".mp4") {
      return cb(new Error("Only .mp4 files are allowed !"));
    }
    cb(null, true);
  }
});

// GET all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload route
router.post("/upload", upload.single("videoFile"), async (req, res) => {
  console.log("Video upload request received", req.body, req.file);
  const { title, description, type, url, price, creatorId } = req.body;

  try {
    const video = new Video({
      title,
      description,
      type,
      // filePath: type === "short" ? req.file?.path.replace(/\\/g, "/") : undefined,\
      filePath: type === "short" ? path.relative("uploads", req.file?.path).replace(/\\/g, "/") : null,
      url: type === "long" ? url : null,
      price: type === "long" ? Number(price) || 0 : 0,
      creatorId
    });

    await video.save();
    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
