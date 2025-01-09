// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJkm_e3KLY1EJ7zSIRoVXbvid3pjjblOA",
  authDomain: "wealth-whiz.firebaseapp.com",
  projectId: "wealth-whiz",
  storageBucket: "wealth-whiz.firebasestorage.app",
  messagingSenderId: "298798671708",
  appId: "1:298798671708:web:327cc2ca230b76476bc399",
  measurementId: "G-446DNW5PTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);