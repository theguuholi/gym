import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from '@services/api';
import { UserDTO } from "@dtos/UserDTO";
import { get, remove, save } from "@storage/UserStorage";
import { getToken, tokenRemove, tokenSave } from "@storage/AuthStorage";
import { Use } from "react-native-svg";

export type AuthContextDataProps = {
    user: UserDTO;
    singIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

    async function userAndTokenUpdate(userData: UserDTO, token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(userData);
    }

    const updateUserProfile = async (userUpdated: UserDTO) => {
        try {
            setUser(userUpdated)
            await save(userUpdated)
        } catch (error) {
            throw error
        }
    }

    async function storageUserAndTokenSave(userData: UserDTO, token: string, refresh_token: string) {
        try {
            setIsLoadingUserStorageData(true)
            await save(userData);
            await tokenSave(token, refresh_token);

        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function singIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password });
            if (data.user && data.token && data.refresh_token) {
                await storageUserAndTokenSave(data.user, data.token, data.refresh_token);
                userAndTokenUpdate(data.user, data.token)
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true);
            setUser({} as UserDTO);
            await remove();
            await tokenRemove()
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function loadUserData() {
        try {
            setIsLoadingUserStorageData(true);

            const userLogged = await get();
            const { token } = await getToken();

            if (token && userLogged) {
                userAndTokenUpdate(userLogged, token);
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        loadUserData()
    }, [])

    useEffect(() => {
        const subscribe = api.registerInterceptTokenManager(signOut);
        return () => subscribe();
    }, [signOut])

    return (
        <AuthContext.Provider value={{
            user,
            singIn,
            signOut,
            isLoadingUserStorageData,
            updateUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}