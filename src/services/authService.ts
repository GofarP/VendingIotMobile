import api from "./api";
import { AuthData } from "../types/auth";

export const authService = {
    login: async (email: string, password: string): Promise<AuthData> => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    logout: async (refreshToken: string | null): Promise<void> => {
        if (!refreshToken) return;
        try {
            await api.post("/auth/logout", {
                refreshToken: refreshToken
            })
        } catch (error) {
            console.warn("Server logout failed, clearing local session anyway.");
        }
    }


}