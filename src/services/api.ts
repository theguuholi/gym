import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";

type signOut = () => void;

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: signOut) => () => void;
}

export const api = axios.create({
    baseURL: "http://192.168.0.84:3333"
}) as APIInstanceProps;

api.registerInterceptTokenManager = singOut => {
    const interceptTokenManager = api.interceptors.response.use((response) => response, (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(new AppError(error.response.data.message))
        } else {
            return Promise.reject(error)
        }
    });

    return () => {
        api.interceptors.response.eject(interceptTokenManager);
    }
}

