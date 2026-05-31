import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

// Sign up with email and password
export const signup = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user profile to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      username: userData.username,
      country: userData.country,
      language: userData.language,
      isAdmin: userData.isAdmin || false,
      isVerified: userData.isVerified || false,
      referrer: userData.referrer || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { user, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Login with email and password
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Get user profile from Firestore
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

// Listen to auth state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
