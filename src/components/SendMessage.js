import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';


const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [gifResults, setGifResults] = useState([]);
  const [showGifSearch, setShowGifSearch] = useState(false);

  const apikey = "AIzaSyABlHGOOFdYke0430KjRBU_DL7oC2D5MLY";
  const clientkey = "my_test_app";

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const searchGIFs = async (searchTerm) => {
    const searchUrl = `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${apikey}&client_key=${clientkey}&limit=8`;
    try {
      const response = await axios.get(searchUrl);
      setGifResults(response.data.results);
    } catch (error) {
      console.error("Error fetching GIFs", error);
    }
  };

  const sendGIF = async (gifUrl) => {
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: gifUrl,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setGifResults([]);
    setShowGifSearch(false);
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="button" onClick={() => setShowEmojiPicker((prev) => !prev)}>
        😀
      </button>
      <button type="button" onClick={() => setShowGifSearch((prev) => !prev)}>
        GIF
      </button>
      {showEmojiPicker && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      {showGifSearch && (
        <div className="gif-picker">
          <input
            type="text"
            placeholder="Search GIFs on Tenor..."
            onChange={(e) => searchGIFs(e.target.value)}
            className="gif-search-input"
          />
          <div className="gif-results">
            {gifResults.map((gif) => (
              <img
                key={gif.id}
                src={gif.media_formats.gif.url}
                alt="GIF"
                onClick={() => sendGIF(gif.media_formats.gif.url)}
                className="gif-item"
              />
            ))}
          </div>
        </div>
      )}
      <button type="submit">
        <i className="fas fa-paper-plane"></i> {/* Font Awesome icon */}
      </button>
    </form>
  );
};

export default SendMessage;
