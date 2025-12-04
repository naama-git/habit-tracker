import { create } from "zustand";
import type { IUser } from "../types/IUser";
import { signUp, login } from "../services/userService";

interface UserState {
    gUser: IUser | null;
    error: string | null;
    loading: boolean;
    token: string;

    signUp: (user: IUser) => Promise<void>;
    login: (user: IUser) => Promise<void>;
}

export const useUserStore = create<UserState>((set: any) => ({
    gUser: null,
    error: null,
    loading: false,
    token: "",

    signUp: async (user: IUser) => {
        set({ loading: true, error: null });
        try {
            const data = await signUp(user);
            set({ gUser: data, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Unknown error", loading: false });
        }
    },

    login: async (user: IUser) => {
        set({ loading: true, error: null });
        try {
            const {accessToken} = await login(user);
            set({ token: accessToken, loading: false });
            localStorage.setItem('token', accessToken)
        } catch (err: any) {
            set({ error: err.message || "Unknown error", loading: false });
        }
    }
}))