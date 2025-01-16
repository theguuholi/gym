import { UserDTO } from "@dtos/UserDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "@storage/storageConfig";


export const save = async (user: UserDTO): Promise<void> => {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export const get = async (): Promise<UserDTO> => {
    const storage = await AsyncStorage.getItem(USER_STORAGE);
    const user: UserDTO = storage ? JSON.parse(storage) : {} as UserDTO;
    return user;
}

export const remove = async (): Promise<void> => {
    await AsyncStorage.removeItem(USER_STORAGE);
}