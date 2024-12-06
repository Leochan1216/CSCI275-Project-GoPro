import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";


// Your web app's Firebase configuration
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
const submit = document.getElementById('submit') 

submit.addEventListener("click", function(event){
    event.preventDefault()
    //Inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert("Creating Account...");
        window.location.href = "indexC(login).html";
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
    });
});