import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_STORAGE } from "./storageConfig";


export const tokenSave = async (token: string): Promise<void> => {
    await AsyncStorage.setItem(AUTH_STORAGE, token);
}

export const getToken = async (): Promise<string> => {
    const token = await AsyncStorage.getItem(AUTH_STORAGE);
    return token || '';
}

export const tokenRemove = async (): Promise<void> => {
    await AsyncStorage.removeItem(AUTH_STORAGE);
}