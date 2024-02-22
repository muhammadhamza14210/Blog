// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3a33b.firebaseapp.com",
  projectId: "mern-blog-3a33b",
  storageBucket: "mern-blog-3a33b.appspot.com",
  messagingSenderId: "473364397004",
  appId: "1:473364397004:web:d0aa7f86f80b7dbe8f7b69"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
