// auth.js
import { auth } from './firebase';

// Sign up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("User created:", user);
    return user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    return null;
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);
    return user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    return null;
  }
};

// Sign-out function
export const logout = async () => {
  try {
    await auth.signOut();
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};
