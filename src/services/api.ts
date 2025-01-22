import { getToken } from "@storage/AuthStorage";
import { AppError } from "@utils/AppError";
import axios, { AxiosError, AxiosInstance } from "axios";

type signOut = () => void;

type PromiseType = {
    onSuccess: (token: string) => void;
    onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: signOut) => () => void;
}

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

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

                const originalRequestConfig = requestError.config;
                console.log("originalRequestConfig", originalRequestConfig)

                if(isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            onSuccess: (token) => {
                                originalRequestConfig.headers['Authorization'] = `Bearer ${token}`;
                                resolve(api(originalRequestConfig))
                            },
                            onFailure: (error) => {
                                reject(error)
                            }
                        })
                    })
                }

                isRefreshing = true;

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

