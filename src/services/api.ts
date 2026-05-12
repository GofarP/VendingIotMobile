import axios from "axios";
import Config from "react-native-config";
import { useAuthStore } from "../store/useAuthStore";

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
)

export default api;