import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOZXcPwO3PKKm2Gizmq26aYcS2bNR_Wk8",
  authDomain: "csci275-project-gopro.firebaseapp.com",
  projectId: "csci275-project-gopro",
  storageBucket: "csci275-project-gopro.firebasestorage.app",
  messagingSenderId: "934685773209",
  appId: "1:934685773209:web:b401df5d8a44655e8e9708",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Attach event listeners
export function setupEventListeners() {
  const submit = document.getElementById("submit");
  if (submit) {
    submit.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("email")?.value;
      const password = document.getElementById("password")?.value;

      if (email && password) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            alert("Creating Account...");
            window.location.href = "indexC(login).html";
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        alert("Please enter a valid email and password.");
      }
    });
  } else {
    console.error("Submit button not found");
  }
}

// Auto-execute only if not in a test environment
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setupEventListeners();
  } else {
    document.addEventListener("DOMContentLoaded", setupEventListeners);
  }
}
