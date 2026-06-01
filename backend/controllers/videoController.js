const Video = require("../models/videoModel");

// ➤ Add YouTube Video
exports.addYoutubeVideo = async (req, res) => {
  try {
    const { title, youtubeUrl } = req.body;
    const video = await Video.create({
      title,
      type: "youtube",
      youtubeUrl,
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➤ Upload Video File
exports.uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;
    const video = await Video.create({
      title,
      type: "upload",
      videoUrl: `/uploads/${req.file.filename}`,
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➤ Get All Videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};