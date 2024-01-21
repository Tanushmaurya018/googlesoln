// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "soln-4a491.firebaseapp.com",
  projectId: "soln-4a491",
  storageBucket: "soln-4a491.appspot.com",
  messagingSenderId: "297012015438",
  appId: "1:297012015438:web:6b14224554f7399d50ee1f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
