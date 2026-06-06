import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const actionCodeSettings = {
  url: `${window.location.origin}/finishLogin`,
  handleCodeInApp: true,
};

export const sendLoginLink = async (email) => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    return { success: true };
  } catch (error) {
    console.error("Error sending sign-in link:", error);
    return { success: false, error: error.message };
  }
};

export const completeLogin = async (email, href) => {
  try {
    if (isSignInWithEmailLink(auth, href)) {
      const result = await signInWithEmailLink(auth, email, href);
      window.localStorage.removeItem("emailForSignIn");
      const user = result.user;

      // Check if user exists in Firestore, if not, create a profile
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      return { success: true, user };
    }
  } catch (error) {
    console.error("Error completing sign-in:", error);
    return { success: false, error: error.message };
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getUserProfile = async (uid) => {
  try {
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (docSnap.exists()) {
      return { data: docSnap.data(), success: true };
    } else {
      return { data: null, success: false };
    }
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const signup = async (email, password, userData) => {
    console.log("signup function is not implemented");
    return { success: false, error: "Signup is not implemented yet." };
};

export const login = async (email, password) => {
    console.log("login function is not implemented");
    return { success: false, error: "Login is not implemented yet." };
};