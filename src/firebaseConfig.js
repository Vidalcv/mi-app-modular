// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdvwmZ0QDtkH-HKZfevlTTp0_PEKdJTNU",
  authDomain: "mi-app-modular.firebaseapp.com",
  projectId: "mi-app-modular",
  storageBucket: "mi-app-modular.firebasestorage.app",
  messagingSenderId: "747262573413",
  appId: "1:747262573413:web:e4429f4b1d32744393bf8c",
  measurementId: "G-TVY6ZPZR5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Firestore database (named export used by the app)
const db = getFirestore(app);

export { app, analytics, db };