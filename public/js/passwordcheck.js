
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const passwordValidation = document.getElementById("password-validation");
  const confirmPasswordValidation = document.getElementById("confirm-password-validation");
  const signupForm = document.getElementById("signup-form");


  // Password validation logic
  passwordInput.addEventListener("input", () => {
    const passwordValue = passwordInput.value;
    const hasLetter = /[a-zA-Z]/.test(passwordValue);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);

    if (hasLetter && hasSpecialChar) {
      passwordValidation.classList.add("hidden");
    } else {
      passwordValidation.classList.remove("hidden");
    }
  });

  // Confirm password match logic
  confirmPasswordInput.addEventListener("input", () => {
    if (confirmPasswordInput.value === passwordInput.value) {
      confirmPasswordValidation.classList.add("hidden");
    } else {
      confirmPasswordValidation.classList.remove("hidden");
    }
  });

  // Form submit validation
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Final password validation before submission
    const hasLetter = /[a-zA-Z]/.test(passwordInput.value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordInput.value);

    if (!hasLetter || !hasSpecialChar) {
      passwordValidation.classList.remove("hidden");
      return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordValidation.classList.remove("hidden");
      return;
    }

    alert("Sign-up successful!");
    
  });

  
