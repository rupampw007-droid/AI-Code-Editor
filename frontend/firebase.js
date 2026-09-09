// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vertexai-3b274.firebaseapp.com",
  projectId: "vertexai-3b274",
  storageBucket: "vertexai-3b274.firebasestorage.app",
  messagingSenderId: "734115888504",
  appId: "1:734115888504:web:440485a24a3618f876dc8d",
  measurementId: "G-BX7J27P8YN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()