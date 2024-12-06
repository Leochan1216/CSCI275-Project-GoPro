const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const passwordValidation = document.getElementById("password-validation");
const confirmPasswordValidation = document.getElementById("confirm-password-validation");
const signupForm = document.getElementById("signup-form");
const submitButton = document.getElementById("submit");

// Function to validate password format
const isPasswordValid = (password) => {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValidLength = password.length >= 6 && password.length <= 30;
  return hasLetter && hasSpecialChar && isValidLength;
};

// Function to check if passwords match
const doPasswordsMatch = () => passwordInput.value === confirmPasswordInput.value;

// Function to update the state of the submit button
const updateSubmitButtonState = () => {
  if (isPasswordValid(passwordInput.value) && doPasswordsMatch()) {
    submitButton.disabled = false; // Enable button if all validations pass
  } else {
    submitButton.disabled = true; // Disable button otherwise
  }
};

// Event listener for password input
passwordInput.addEventListener("input", () => {
  if (isPasswordValid(passwordInput.value)) {
    passwordValidation.classList.add("hidden");
  } else {
    passwordValidation.classList.remove("hidden");
    passwordValidation.textContent =
      "Password must contain 6-30 characters, including at least one letter and one special character.";
  }
  updateSubmitButtonState(); // Update button state on password input
});

// Event listener for confirm password input
confirmPasswordInput.addEventListener("input", () => {
  if (doPasswordsMatch()) {
    confirmPasswordValidation.classList.add("hidden");
  } else {
    confirmPasswordValidation.classList.remove("hidden");
    confirmPasswordValidation.textContent = "Passwords do not match.";
  }
  updateSubmitButtonState(); // Update button state on confirm password input
});

// Initial button state
submitButton.disabled = true;