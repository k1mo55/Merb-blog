// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dddf5.firebaseapp.com",
  projectId: "mern-blog-dddf5",
  storageBucket: "mern-blog-dddf5.appspot.com",
  messagingSenderId: "515541562199",
  appId: "1:515541562199:web:86d57128ce673c5847c412"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);