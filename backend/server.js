const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const videoRoutes = require("./routes/video.routes.js");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

app.use("/api/auth", require("./routes/auth"));

// app.use("/uploads", express.static("uploads")); // Serve video files
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".mp4")) {
      res.setHeader("Content-Type", "video/mp4");
    }
  }
}));
app.use("/api/videos", videoRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));