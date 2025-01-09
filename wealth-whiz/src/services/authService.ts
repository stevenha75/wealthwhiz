import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Sign Up
export const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Log In
export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Log Out
export const logout = () => {
  return signOut(auth);
};

// Auth State Observer
export const observeAuthState = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};
