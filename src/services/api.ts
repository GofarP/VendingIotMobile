import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Config from "react-native-config";
import { useAuthStore } from "../store/useAuthStore";
interface FailedRequest {
    resolve: (token: string | null) => void;
    reject: (error: any) => void;
}


interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
}

const api = axios.create({
    baseURL: Config.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = useAuthStore.getState().auth?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise<string | null>((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const authData = useAuthStore.getState().auth;
            const res = await axios.post(`${Config.API_URL}/api/auth/refresh`, {
                accessToken: authData?.token,
                refreshToken: authData?.refreshToken
            });

            if(res.status===200){
                const {token, refreshToken}=res.data.data;
                useAuthStore.getState().loginAction({
                    ...authData,
                    token:token,
                    refreshToken:refreshToken
                }as any);

                processQueue(null, token);

                originalRequest.headers.Authorization=`Bearer ${token}`;
                return api(originalRequest);
            }
        }
        catch(refreshError){
            processQueue(refreshError,null);
            useAuthStore.getState().logout();
            return Promise.reject(refreshError);
        }finally{
            isRefreshing=false;
        }

        return Promise.reject(error);
    }
);

export default api;