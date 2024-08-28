import React, { useState } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";

function App() {
  const [user] = useAuthState(auth);
  const [backgroundImage, setBackgroundImage] = useState(
    "https://images.unsplash.com/photo-1698138819865-88d3add4838f?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const handleBackgroundChange = (url) => {
    setBackgroundImage(url);
  };

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <NavBar onBackgroundChange={handleBackgroundChange} />
      {!user ? (
        <Welcome />
      ) : (
        <ChatBox />
      )}
    </div>
  );
}

export default App;
