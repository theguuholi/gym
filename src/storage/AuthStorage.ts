import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_STORAGE } from "./storageConfig";

type StorageAuthTokenProps = {
    token: string;
    refresh_token: string;
}

export const tokenSave = async (token: string, refresh_token: string): Promise<void> => {
    await AsyncStorage.setItem(AUTH_STORAGE, JSON.stringify({ token, refresh_token }));
}

export const getToken = async (): Promise<StorageAuthTokenProps> => {
    const response = await AsyncStorage.getItem(AUTH_STORAGE);
    const { token,  refresh_token}: StorageAuthTokenProps = response ? JSON.parse(response) : {};
    return { token,  refresh_token};
}

export const tokenRemove = async (): Promise<void> => {
    await AsyncStorage.removeItem(AUTH_STORAGE);
}