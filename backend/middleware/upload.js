const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

// Video file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /\.(mp4|mov|avi|mkv)$/i;

  if (allowedTypes.test(file.originalname)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files (.mp4, .mov, .avi, .mkv) are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB
  },
});

module.exports = upload;