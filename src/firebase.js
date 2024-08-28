// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOSrqxp4u0idxRIHiQ2uidSCUlPwCnFMI",
  authDomain: "react-chat-ae417.firebaseapp.com",
  projectId: "react-chat-ae417",
  storageBucket: "react-chat-ae417.appspot.com",
  messagingSenderId: "1074696531033",
  appId: "1:1074696531033:web:57682bb8ba870a99fc9548",
  measurementId: "G-38SVGT8CKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
