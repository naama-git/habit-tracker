import { create } from "zustand";
import type { IUser } from "../types/IUser";
import { signUp, login } from "../services/userService";
import type { IError } from "../types/IError";


interface UserState {
    currentUser: IUser | null;
    error: IError;
    loading: boolean;
    token: string;

    signUp: (user: IUser) => Promise<void>;
    login: (user: IUser) => Promise<void>;
    clearError:()=>void;
}

export const useUserStore = create<UserState>((set) => ({
    currentUser: null,
    error: { message: null, status: null, errors: [] },
    loading: false,
    token: "",

    signUp: async (user: IUser) => {
        set({ loading: true, error: { message: null, status: null } });
        try {
            const data = await signUp(user);
            set({ currentUser: data });
        } catch (err) {
            const error = err as IError
            if (error.message) {
                set({ error: { message: error.message, status: error.status } })
            }
            else if (error.errors !== undefined && error.errors) {
                if (error.errors?.length > 0) {
                    set({ error: { message: "validation error", status: error.status, errors: error.errors } })
                }
            }
        }
        finally{
            set({loading:false})
        }
    },

    login: async (user: IUser) => {

        set({ loading: true, error: { message: null, status: null } });
        try {
            const { accessToken } = await login(user);
            set({ token: accessToken });
            localStorage.setItem('token', accessToken)
        } catch (err) {
            const error = err as IError
            if (error.message) {
                set({ error: { message: error.message, status: error.status } })
            }
            else if (error.errors !== undefined && error.errors) {
                if (error.errors?.length > 0) {
                    set({ error: { message: "validation error", status: error.status, errors: error.errors } })
                }
            }
        }
        finally{
            set({loading:false})
        }
    },
    clearError: () => {
        set({error:{ message: null, status: null, errors: [] }})
    }
}))
