// BackgroundChanger.js
import React, { useState } from "react";

const BackgroundChanger = ({ onClose }) => {
  const [backgroundUrl, setBackgroundUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (backgroundUrl) {
      document.querySelector('.App').style.backgroundImage = `url(${backgroundUrl})`;
      onClose();
    }
  };

  return (
    <div className="background-changer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="backgroundUrl">Enter Background Image URL:</label>
        <input
          id="backgroundUrl"
          type="text"
          value={backgroundUrl}
          onChange={(e) => setBackgroundUrl(e.target.value)}
          placeholder="Enter URL..."
        />
        <button type="submit">Change Background</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default BackgroundChanger;
