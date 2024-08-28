import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  const isGif = (url) => url.endsWith('.gif');

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        {isGif(message.text) ? (
          <img
            src={message.text}
            alt="GIF"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        ) : (
          <p className="user-message">{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
