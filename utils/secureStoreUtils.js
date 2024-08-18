// utils/secureStoreUtils.js
import * as SecureStore from 'expo-secure-store';

export async function storeData(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error('Failed to store data:', error);
  }
}

export async function getData(key) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Failed to retrieve data:', error);
  }
}

export async function deleteData(key) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Failed to delete data:', error);
  }
}
