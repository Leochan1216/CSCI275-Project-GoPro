import { initializeApp } from "firebase/js/app";

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

//Inputs
const email = document.getElementById('email')
const password = document.getElementById('password')
const submit = document.getElementById('submit') 

submit.addEventListener("click", function(event){
    event.preventDefault()
    alert(5)
})