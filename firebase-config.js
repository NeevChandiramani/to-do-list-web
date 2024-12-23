// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhFELwVVaY5oTDbT9DHo-2Kd-nvoUnCq8",
    authDomain: "todo-web-2d590.firebaseapp.com",
    projectId: "todo-web-2d590",
    storageBucket: "todo-web-2d590.firebasestorage.app",
    messagingSenderId: "543091604455",
    appId: "1:543091604455:web:3a784e7e9c89984f595b42"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();