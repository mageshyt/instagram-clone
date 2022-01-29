// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React from "react";
const firebaseConfig = {
  apiKey: "AIzaSyCDXgyJn7RVNlYVsCj-fH6NLLp37w1bzQ0",
  authDomain: "insta-44ef9.firebaseapp.com",
  projectId: "insta-44ef9",
  storageBucket: "insta-44ef9.appspot.com",
  messagingSenderId: "515090443069",
  appId: "1:515090443069:web:e59e9cbaae245c96277354",
  measurementId: "G-2K92TV6DCZ",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((re) => console.log(re))
    .catch((err) => {
      console.log(err);
    });
};
const useAuth = () => {
  const [currentUser, currentUserSet] = React.useState(null);
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        currentUserSet(user);
      } else {
        currentUserSet(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return currentUser;
};
export { app, db, storage, useAuth, auth, signInWithGoogle };
