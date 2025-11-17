

import axios from "axios";
import type { IUser } from "../types/IUser";

export const signUp = async (user: IUser) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, user);
        return res.data

    } catch (error: any) {

        throw new Error(error.response?.data?.message || "Failed to sign up user");
    };
}

export const login = async (user: IUser) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, user);
        
        return res.data

    } catch (error: any) {

        throw new Error(error.response?.data?.message || "Failed to sign up user");
    };
}