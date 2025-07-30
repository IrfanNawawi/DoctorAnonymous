import { MMKV } from 'react-native-mmkv';

// Inisialisasi storage
const storage = new MMKV();

/**
 * Menyimpan data ke MMKV
 * @param key string
 * @param value string | number | boolean | object
 */
export const setItem = (key: string, value: any) => {
  if (typeof value === 'object') {
    storage.set(key, JSON.stringify(value));
  } else {
    storage.set(key, value);
  }
};

/**
 * Mengambil data dari MMKV
 * @param key string
 */
export const getItem = (key: string) => {
  const value = storage.getString(key);
  try {
    return JSON.parse(value ?? '');
  } catch (e) {
    return value;
  }
};

/**
 * Menghapus data dari MMKV
 * @param key string
 */
export const removeItem = (key: string) => {
  storage.delete(key);
};

/**
 * Cek apakah data dengan key tertentu ada
 * @param key string
 */
export const hasItem = (key: string) => {
  return storage.contains(key);
};
