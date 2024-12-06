// Firebase configuration
const firebaseConfig = {
  authDomain: "csci275-project-gopro.web.app",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


const login = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
};


// Handle Login Form Submission
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      await auth.signInWithEmailAndPassword(email, password);
      alert('Login successful!');
      window.location.href = 'indexC(login).html'; // Redirect on successful login
  } catch (error) {
      alert(`Error: ${error.message}`);
  }
});
