// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirebase } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const db = getFirebase();
const storage = getStorage();
export { app, db, storage };
