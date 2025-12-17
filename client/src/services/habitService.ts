// habitServices
// sends data to server in axios req & res


import axios, { AxiosError } from "axios";
import type { IHabit } from "../types/IHabit";
import type { IError } from "../types/IError";

const handlingErrors = (err: any, type: string) => {

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
            throw { message: `Failed to ${type} habit` }
        }
        else {
            console.error('An unknown error occurred:', err);
            throw { message: "An unknown error occurred" }
        }
    }
}
// get user habits from server
export const getHabits = async (token: string) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/myHabits`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
        return res.data

    } catch (err) {
        handlingErrors(err, "get")
    }

}

// add havbit to user
export const addHabit = async (habit: IHabit, token: string) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/myHabits`, habit, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return res.data
    } catch (err) {
        handlingErrors(err, "add")

    }
}

// delete user habit, by ID
export const deleteHabit = async (_id: string, token: string) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/myHabits/${_id}`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
        return res.data
    } catch (err) {
        handlingErrors(err, "delete")

    }
}

export const getOneHabit = async (_id: string) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/myHabits/${_id}`);
        return res.data;
    } catch (err) {
        handlingErrors(err, "get one")
    }
}

export const updateHabit = async (_id: string, updates: Partial<IHabit>, token: string) => {


    try {
        const res = await axios.patch(`${import.meta.env.VITE_API_URL}/myHabits/${_id}`, updates, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (err) {
        handlingErrors(err, "update")
    }
}