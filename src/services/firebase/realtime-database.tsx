import { getApp } from '@react-native-firebase/app';
import { 
  get, 
  getDatabase, 
  limitToLast, 
  orderByChild, 
  query, 
  ref, 
  set, 
  update 
} from '@react-native-firebase/database';
import { constant } from '../../utils';

const app = getApp();
const db = getDatabase(app, constant.DATABASE_URL);

export const saveUserData = async (userId: string, userData: object) => {
  try {
    await set(ref(db, `/users/${userId}`), userData);
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (userId: string) => {
  try {
    const snapshot = await get(ref(db, `/users/${userId}`));
    return snapshot.val();
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async (userId: string, userData: object) => {
  try {
    await update(ref(db, `/users/${userId}`), userData);
  } catch (error) {
    throw error;
  }
};

export const getDataDoctor = async (reference: string) => {
  try {
    const snapshot = await get(ref(db, reference));
    return snapshot.val();
  } catch (error) {
    throw error;
  }
};

export const getFilterDataDoctor = async (reference: string) => {
  try {
    const doctorQuery = query(
      ref(db, reference),
      orderByChild('rate'),
      limitToLast(3)
    );
    const snapshot = await get(doctorQuery);
    return snapshot.val();
  } catch (error) {
    throw error;
  }
};
