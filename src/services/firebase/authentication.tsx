import auth from '@react-native-firebase/auth';

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
  return auth().onAuthStateChanged((user) => {
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
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  };
};

/**
 * Login account
 * @param email
 * @param password
 * @returns userCredential
 */
export const loginAccount = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  };
};

/**
 * Logout account
 */
export const logoutAccount = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  };
};

/**
 * Change password
 * @param password
 */
export const changePassword = async (password: string) => {
  try {
    await auth().currentUser?.updatePassword(password);
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  }
};