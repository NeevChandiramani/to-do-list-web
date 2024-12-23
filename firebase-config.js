// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhFELwVVaY5oTDbT9DHo-2Kd-nvoUnCq8",
  authDomain: "todo-web-2d590.firebaseapp.com",
  projectId: "todo-web-2d590",
  storageBucket: "todo-web-2d590.firebasestorage.app",
  messagingSenderId: "543091604455",
  appId: "1:543091604455:web:3a784e7e9c89984f595b42",
  measurementId: "G-DSBBTJ3PQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();