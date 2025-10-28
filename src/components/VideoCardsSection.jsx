import React from "react";
import { Link } from "react-router-dom";
import "./VideoCardsSection.css";

// Import videos (place them in src/assets/videos/)
import Video1 from "../assets/videos/video1.mp4";
import Video2 from "../assets/videos/video2.mp4";
import Video3 from "../assets/videos/video3.mp4";

const videoCards = [
  { title: "Roshnai", video: Video1, link: "/roshnai" },
  { title: "Silver Stories", video: Video2, link: "/silver-stories" },
  { title: "Rings & Earrings", video: Video3, link: "/rings-earrings" },
];

const VideoCardsSection = () => {
  return (
    <section className="video-section">
      <h2 className="video-title">Collections For Every Occasion</h2>
      <p className="video-subtitle">Jewellers that connects with every heart</p>

      {/* Horizontal scroll with snap; swipe works both directions on mobile */}
      <div className="video-cards">
        {videoCards.map((card, i) => (
          <Link key={i} to={card.link} className="video-card">
            <video src={card.video} autoPlay muted loop playsInline />
            <div className="video-card-text">
              
              
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default VideoCardsSection;
