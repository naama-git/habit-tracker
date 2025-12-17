

import axios, { AxiosError } from "axios";
import type { IUser } from "../types/IUser";
import type { IError } from "../types/IError";


export const signUp = async (user: IUser) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, user);
        return res.data

    } catch (err) {

        if (axios.isAxiosError(err)) {
            const error = err as AxiosError<IError>
            if (error.response) {

                if (error.response.data.errors) {
                    console.log(error.response.data.errors);
                    throw ({ errors: error.response.data.errors })
                }
                console.log(error.response.data.message)
                throw { message: error.response.data.message, status: error.response.data.status }
            }
            else if (error.request) {
                console.log("Error request. ", error.request);
                throw { message: "Failed to sign up user" }
            }
            else {
                console.error('An unknown error occurred:', err);
                throw { message: "An unknown error occurred" }
            }
        }
    }
}

export const login = async (user: IUser) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, user);
        return res.data

    } catch (err) {

        if (axios.isAxiosError(err)) {
            const error = err as AxiosError<IError>
            if (error.response) {

                if (error.response.data.errors) {
                    console.log(error.response.data.errors);
                    throw ({ errors: error.response.data.errors })
                }
                console.log(error.response.data.message)
                throw { message: error.response.data.message, status: error.response.data.status }
            }
            else if (error.request) {
                console.log("Error request. ", error.request);
                throw { message: "Failed to sign up user" }
            }
            else {
                console.error('An unknown error occurred:', err);
                throw { message: "An unknown error occurred" }
            }
        }


    };
}