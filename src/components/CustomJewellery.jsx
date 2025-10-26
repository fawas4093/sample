import React from "react";
import "./CustomJewellery.css";

export default function CustomJewellery() {
  return (
    <section className="custom-jewellery">
      <div className="content-wrapper">
        {/* Left side: Direct video */}
        <div className="video-container">
          <video
            src="/videos/ring.webm"   // put video inside public/videos/jewellery.mp4
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Right side: Description */}
        <div className="text-container">
          <h2>Design Your Dream Jewellery</h2>
          <p>
            Have a vision in mind? Let’s create a custom piece that’s as unique as you are!
            Whether it's an engagement ring, personalized necklace, or a one-of-a-kind design,
            we’re here to turn your ideas into a beautiful reality. Share your dream with us,
            and we’ll craft a masterpiece that tells your story.
          </p>
          <button className="cta-btn">CUSTOM JEWELLERY</button>
        </div>
      </div>
    </section>
  );
}
