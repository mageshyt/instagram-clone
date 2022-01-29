// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React from "react";
const firebaseConfig = {
  apiKey: "AIzaSyBAJ3y-_9RO5mPtd3U7fCgsqywWvewUwP0",
  authDomain: "instagram-clone-cee33.firebaseapp.com",
  projectId: "instagram-clone-cee33",
  storageBucket: "instagram-clone-cee33.appspot.com",
  messagingSenderId: "213870820410",
  appId: "1:213870820410:web:6d063ceb31d2a010840903",
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
