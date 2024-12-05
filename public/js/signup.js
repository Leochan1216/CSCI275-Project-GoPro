// login.js
import { auth } from './firebase';  // Import Firebase Authentication

// Sign up new users
const signUp = async (email, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("User created:", user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

// Log in existing users
const login = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
};




document.getElementById('signup-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  const passwordValidation = document.getElementById('password-validation');
  const confirmPasswordValidation = document.getElementById('confirm-password-validation');

  // Reset validation messages
  passwordValidation.classList.add('hidden');
  confirmPasswordValidation.classList.add('hidden');

  // Validate password
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasLetter || !hasSpecialChar) {
    passwordValidation.classList.remove('hidden');
    return;
  }

  // Validate confirm password
  if (password !== confirmPassword) {
    confirmPasswordValidation.classList.remove('hidden');
    return;
  }

  // Simulate account creation (replace with actual logic)
  alert(`Account created for ${username}!`);
  window.location.href = 'indexP(login).html'; // Redirect to login page
});
