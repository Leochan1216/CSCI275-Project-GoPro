// firebase.js

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBoDFigDq6dgKownjXf0-C2WgLpEbuKRMw",
    authDomain: "csci275-project-gopro.web.app",
    projectId: "go-pro-9f9e9",
    storageBucket: "go-pro-9f9e9.firebasestorage.app",
    messagingSenderId: "1030451674360",
    appId: "1:1030451674360:web:dfe5fc5a83e09db0990f0d",
    measurementId: "G-XVHRB6CT38"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Export Firebase services for use in other parts of the app
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();
  export const messaging = firebase.messaging();
  