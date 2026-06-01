const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // <-- Add this
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});