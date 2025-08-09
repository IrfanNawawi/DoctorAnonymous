import { firebase } from "@react-native-firebase/database";
import { constant } from "../../utils";

export const saveUserData = async (userId: string, userData: object) => {
  try {
    await firebase
      .app()
      .database(constant.DATABASE_URL)
      .ref(`/users/${userId}`)
      .set(userData);
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (userId: string) => {
  try {
    const snapshot = await firebase
      .app()
      .database(constant.DATABASE_URL)
      .ref(`/users/${userId}`)
      .once('value');
    return snapshot.val();
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async (userId: string, userData: object) => {
  try {
    await firebase
      .app()
      .database(constant.DATABASE_URL)
      .ref(`/users/${userId}`)
      .update(userData)
  } catch (error) {
    throw error;
  }
}