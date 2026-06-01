import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("youtube");

  // YouTube states
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // Media states
  const [mediaTitle, setMediaTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // =========================
  // Add YouTube Video
  // =========================
  const addYoutubeVideo = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/videos/youtube",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            youtubeUrl,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("YouTube video added successfully!");

        setTitle("");
        setYoutubeUrl("");

        console.log(data);
      } else {
        alert(data.message || "Failed to add video");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }

    setLoading(false);
  };

  // =========================
  // Upload Media Video
  // =========================
  const uploadMediaVideo = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please select a video file");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", mediaTitle);
      formData.append("video", videoFile);

      const response = await fetch(
        "http://localhost:5000/api/videos/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Media video uploaded successfully!");

        setMediaTitle("");
        setVideoFile(null);

        console.log(data);
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      <button onClick={logout}>Logout</button>

      <hr />

      {/* Tabs */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("youtube")}
          style={{
            marginRight: "10px",
            padding: "10px",
          }}
        >
          YouTube Video
        </button>

        <button
          onClick={() => setActiveTab("media")}
          style={{
            padding: "10px",
          }}
        >
          Media Video
        </button>
      </div>

      {/* ========================= */}
      {/* YouTube Video Tab */}
      {/* ========================= */}
      {activeTab === "youtube" && (
        <form onSubmit={addYoutubeVideo}>
          <h2>Add YouTube Video</h2>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Video Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: "300px",
                padding: "10px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="url"
              placeholder="YouTube URL"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              required
              style={{
                width: "500px",
                padding: "10px",
              }}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save YouTube Video"}
          </button>
        </form>
      )}

      {/* ========================= */}
      {/* Media Upload Tab */}
      {/* ========================= */}
      {activeTab === "media" && (
        <form onSubmit={uploadMediaVideo}>
          <h2>Upload Media Video</h2>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Video Title"
              value={mediaTitle}
              onChange={(e) => setMediaTitle(e.target.value)}
              required
              style={{
                width: "300px",
                padding: "10px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      )}
    </div>
  );
}