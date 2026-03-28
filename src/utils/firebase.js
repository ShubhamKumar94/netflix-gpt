// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAduOi2636fQQXsc9Gk8lukkG5RFDPC_aE",
  authDomain: "netflixgpt-276d9.firebaseapp.com",
  projectId: "netflixgpt-276d9",
  storageBucket: "netflixgpt-276d9.firebasestorage.app",
  messagingSenderId: "116139889628",
  appId: "1:116139889628:web:de85b67c1a0caf9a87f519",
  measurementId: "G-YRNYCQBN7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const auth = getAuth();
