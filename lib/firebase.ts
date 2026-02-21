// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"; // ✅ ADD THIS
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuLkPZ2XWW3sONxDole71H3Mrj2wUtjtQ",
  authDomain: "hackfest-d1b09.firebaseapp.com",
  projectId: "hackfest-d1b09",
  storageBucket: "hackfest-d1b09.firebasestorage.app",
  messagingSenderId: "236892650371",
  appId: "1:236892650371:web:b6e5358f6d7a8d8fa654b6",
  measurementId: "G-12MQYQGKE8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app); // ✅ THIS IS THE CRITICAL LINE
