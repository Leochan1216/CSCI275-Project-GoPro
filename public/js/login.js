// Firebase configuration
const firebaseConfig = {
  authDomain: "csci275-project-gopro.web.app",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle Login Form Submission
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      await auth.signInWithEmailAndPassword(email, password);
      alert('Login successful!');
      window.location.href = 'indexP(login).html'; // Redirect on successful login
  } catch (error) {
      alert(`Error: ${error.message}`);
  }
});
