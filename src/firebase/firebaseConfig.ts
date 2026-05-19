
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU2R2epTlbOFZdV6o72ESEdo__CVWhJJ0",
  authDomain: "lojinhacrud.firebaseapp.com",
  projectId: "lojinhacrud",
  storageBucket: "lojinhacrud.firebasestorage.app",
  messagingSenderId: "375118022254",
  appId: "1:375118022254:web:4bc031d8c085ba5714087f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);