import { UserDTO } from "@dtos/UserDTO";
import { createContext, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState({
        id: '123',
        name: 'John Doe',
        email: 'jon@doe.com',
        avatar: 'theguuholi.png'
    });

    return (
        <AuthContext.Provider value={{
            user
        }}>

            {
                children
            }
        </AuthContext.Provider>
    )
}

