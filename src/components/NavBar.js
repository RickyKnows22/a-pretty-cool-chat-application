import React, { useState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const NavBar = ({ onBackgroundChange }) => {
  const [user] = useAuthState(auth);
  const [newBackgroundUrl, setNewBackgroundUrl] = useState("");

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  const handleBackgroundUrlChange = () => {
    if (newBackgroundUrl) {
      onBackgroundChange(newBackgroundUrl);
      setNewBackgroundUrl("");
    }
  };

  return (
    <nav className="nav-bar">
      <h1>My Forum</h1>
      {user ? (
        <div className="nav-items">
          <input
            type="text"
            value={newBackgroundUrl}
            onChange={(e) => setNewBackgroundUrl(e.target.value)}
            placeholder="Enter background URL"
          />
          <button onClick={handleBackgroundUrlChange} className="change-background">
            Change Background
          </button>
          <button onClick={signOut} className="sign-out" type="button">
            Sign Out
          </button>
        </div>
      ) : (
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
