// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR-h6hSfAJH9NlZ02s175uutNTPYjdx88",
  authDomain: "geoatlas-2152d.firebaseapp.com",
  projectId: "geoatlas-2152d",
  storageBucket: "geoatlas-2152d.firebasestorage.app",
  messagingSenderId: "83461719658",
  appId: "1:83461719658:web:93f992f28962a312bb6c13",
  measurementId: "G-EQKQZV8JJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);