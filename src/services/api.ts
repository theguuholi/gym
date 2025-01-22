import { getToken } from "@storage/AuthStorage";
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
    const interceptTokenManager = api.interceptors.response.use((response) => response, async (requestError) => {
        if (requestError?.response?.status === 401) {
            if (requestError.response.data?.message === "token.expired" || requestError.response.data?.message === "token.invalid") {
                // start a refresh token flow
                const { refresh_token } = await getToken();

                if (!refresh_token) {
                    singOut();
                    return Promise.reject(new AppError(requestError))
                }
            }
            singOut();
        }




        if (requestError.response && requestError.response.data) {
            return Promise.reject(new AppError(requestError.response.data.message))
        } else {
            return Promise.reject(requestError)
        }


    });

    return () => {
        api.interceptors.response.eject(interceptTokenManager);
    }
}

