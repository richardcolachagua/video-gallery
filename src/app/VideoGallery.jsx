import React, { useState } from "react";
import "./video-gallery.css";

const videos = [
  {
    src: "/",
    thumb: "/",
    title: "Nature Walk",
    topic: "Nature",
    length: "1:20",
  },
  {
    src: "/",
    thumb: "/",
    title: "City Nights",
    topic: "Urban",
    length: "2:05",
  },
  {
    src: "/",
    thumb: "/",
    title: "Mountain View",
    topic: "Adventure",
    length: "0:45",
  },
];
const topics = ["All", ...Array.from(new Set(videos.map((v) => v.topic)))];

const VideoGallery = () => {
  const [modal, setModal] = useState({ open: false, video: null });
  const [filter, setFilter] = useState("All");

  const filteredVideos =
    filter === "All" ? videos : videos.filter((v) => v.topic === filter);

  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Interactive Video Gallery</h2>
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        {topics.map((topic) => (
          <button
            key={topic}
            style={{
              margin: "0 0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "16px",
              border: filter === topic ? "2px solid #00c0e2" : "1px solid #ccc",
              background: filter === topic ? "#00c0e2" : "#fff",
              color: filter === topic ? "#fff" : "#222",
              cursor: "pointer",
            }}
            onClick={() => setFilter(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      <div className="gallry-grid">
        {filteredVideos.map((video, idx) => (
          <div
            className="gallery-thumb"
            key={idx}
            onClick={() =>
              setModal({
                open: true,
                video,
              })
            }
          >
            <img src={video.thumb} alt={video.title} />
            <span>
              {video.title} <br />
              <small>{video.length}</small>
            </span>
          </div>
        ))}
      </div>
      {modal.open && (
        <div
          className="modal"
          onClick={() => setModal({ open: false, video: null })}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span
              className="modal-close"
              onClick={() =>
                setModal({
                  open: false,
                  video: null,
                })
              }
            >
              &times;
            </span>
            <video
              src={modal.video.src}
              controls
              autoPlay
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <div style={{ color: "#fff", marginTop: "0.5rem" }}>
              <strong>{modal.video.title}</strong> &bull;
              {modal.video.topic} &bull; {modal.video.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default VideoGallery;
