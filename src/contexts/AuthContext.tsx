import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { get, remove, save } from "@storage/UserStorage";
import { createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

    const signIn = async (email: string, password: string) => {
        try {
            const { data } = await api.post('/sessions', { email, password });
            if (data.user) setUser(data.user);
            save(data.user);

        } catch (error) {
            throw error;
        }
    }

    const signOut = async () => {
        try {
            setIsLoadingUserStorageData(true)
            setUser({} as UserDTO);
            await remove();
        } catch (error) {
            throw error;
        }
         finally{
            setIsLoadingUserStorageData(false);
         }
    }

    const loadUserData = async () => {
        try {
            const user = await get();
            setUser(user);
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }


    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            isLoadingUserStorageData, 
            signOut
        }}>

            {
                children
            }
        </AuthContext.Provider>
    )
}

