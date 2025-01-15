import { UserDTO } from "@dtos/UserDTO";
import { createContext } from "react";
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

export type AuthContextDataProps = {
    user: UserDTO;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

    return (
        <AuthContext.Provider value={{
            user: {
                id: '123',
                name: 'John Doe',
                email: 'jon@doe.com',
                avatar: 'theguuholi.png'
            }
        }}>

            {
                children
            }
        </AuthContext.Provider>
    )
}

