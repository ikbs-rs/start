import React from "react";

const HomeMultimedia = () => {
  return (
    <div id="multimedia" className="landing-multimedia">
      <div className="multimedia-topic-shadow">
        <div className="multimedia-topic">MULTIMEDIA</div>
      </div>
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/WVkX7gkNeyA"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default HomeMultimedia;
