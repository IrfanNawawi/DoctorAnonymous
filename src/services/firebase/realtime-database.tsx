import { getApp } from '@react-native-firebase/app';
import { 
  equalTo,
  get, 
  getDatabase, 
  limitToLast, 
  onValue, 
  orderByChild,
  push,
  query, 
  ref, 
  set, 
  Unsubscribe, 
  update 
} from '@react-native-firebase/database';
import { constant, substringDash, substringSecondDash } from '../../utils';

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

export const getDataMessages = async (reference: string) => {
  try {
    const snapshot = await get(ref(db, reference));
    if (!snapshot.exists()) return [];
    const dataMessages = snapshot.val();
    const message = await Promise.all(
      Object.keys(dataMessages).map(async (key) => {
        const doctorDetail = await getDataDoctor(`doctors/${dataMessages[key].uidPartner}/`);
        doctorDetail.photo = { uri: doctorDetail.photo };
        return {
          id: key,
          ...dataMessages[key],
          doctorDetail,
        };
      })
    );

    message.sort(
      (a, b) =>
        new Date(b.lastChatDelivery).getTime() -
        new Date(a.lastChatDelivery).getTime()
    );

    return message;
  } catch (error) {
    throw error;
  }
};

export const getDataDoctorById = async (reference: string, orderRef: string, id: string | number) => {
  try {
    const doctorQueryById = query(
      ref(db, reference),
      orderByChild(orderRef),
      equalTo(id),
    );
    const snapshot = await get(doctorQueryById);

    if (!snapshot.exists()) return [];
    const result = Object.keys(snapshot.val()).map((key) => ({
      ...snapshot.val()[key],
    }));

    return result;
  } catch (error) {
    throw error;
  }
};

export const getFilterDataDoctor = async (reference: string, orderRef: string, limit: number) => {
  try {
    const doctorQueryFilter = query(
      ref(db, reference),
      orderByChild(orderRef),
      limitToLast(limit),
    );
    const snapshot = await get(doctorQueryFilter);
    return snapshot.val();
  } catch (error) {
    throw error;
  }
};

export const saveChatData = async (chatId: string, dateChat: string, chatContentData: object) => {
  try {
    await push(ref(db, `/chatting/${chatId}/allChat/${dateChat}`), chatContentData);
  } catch (error) {
    throw error;
  }
};

export const getChatData = (
  chatId: string,
  callback: (data: any[]) => void
): Unsubscribe => {
  const chatRef = ref(db, `/chatting/${chatId}/allChat/`);
  const unsubscribe = onValue(chatRef, (snapshot) => {
    if (!snapshot.exists() || !snapshot.val()) {
      callback([]);
      return;
    }

    const dataSnapshot = snapshot.val();

    const allDataChat = Object.keys(dataSnapshot).map((key) => {
      const dataChat = dataSnapshot[key];

      const newDataChat = Object.keys(dataChat)
        .map((keyChat) => ({
          id: keyChat,
          data: dataChat[keyChat],
        }))
        .sort(
          (a, b) =>
            new Date(a.data.chatDelivery).getTime() -
            new Date(b.data.chatDelivery).getTime()
        );

      return {
        id: key,
        data: newDataChat,
      };
    });

    allDataChat.sort(
      (a, b) => 
        new Date(a.id).getTime() - 
        new Date(b.id).getTime()
    );

    callback(allDataChat);
  });

  return unsubscribe;
};

export const saveLastChatData = async (flagUser: boolean, chatId: string, lastChatContentData: object) => {
  try {
    await set(ref(db, `/messages/${flagUser ? substringDash(chatId) : substringSecondDash(chatId)}/${chatId}`), lastChatContentData);
  } catch (error) {
    throw error;
  }
};

