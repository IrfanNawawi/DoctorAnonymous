import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from '@react-native-firebase/auth';

const auth = getAuth(getApp());

/**
 * Listen session login user
 * @param onLogin Callback saat user login
 * @param onLogout Callback saat user logout
 * @returns unsubscribe function
 */
export const getSessionAccount = (
  onLogin: () => void,
  onLogout: () => void
) => {
  return onAuthStateChanged(auth, (user) => {
    user ? onLogin() : onLogout();
  });
};

/**
 * Register account
 * @param email
 * @param password
 * @returns userCredential
 */
export const registerAccount = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) throw error.message;
  }
};

/**
 * Login account
 * @param email
 * @param password
 * @returns userCredential
 */
export const loginAccount = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) throw error.message;
  }
};

/**
 * Logout account
 */
export const logoutAccount = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) throw error.message;
  }
};

/**
 * Change password
 * @param password
 */
export const changePassword = async (password: string) => {
  try {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, password);
    }
  } catch (error) {
    if (error instanceof Error) throw error.message;
  }
};
