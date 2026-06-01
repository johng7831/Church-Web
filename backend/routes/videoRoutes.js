const express = require("express");
const router = express.Router();

const {
  addYoutubeVideo,
  uploadVideo,
  getAllVideos,
} = require("../controllers/videoController");

// IMPORTANT: this must point to middleware file
const upload = require("../middleware/upload");

// ➤ YouTube video add
router.post("/youtube", addYoutubeVideo);

// ➤ Upload video file
router.post("/upload", upload.single("video"), uploadVideo);

// ➤ Get all videos
router.get("/", getAllVideos);

module.exports = router;