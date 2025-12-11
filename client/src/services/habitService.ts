// habitServices
// sends data to server in axios req & res


import axios from "axios";
import type { IHabit } from "../types/IHabit";


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

    } catch (error: any) {

        throw new Error(error.response?.data?.message || "Failed to fetch habits");
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
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to add habits");

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
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete habits");

    }
}

export const getOneHabit = async (_id: string) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/myHabits/${_id}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to get a habit");
    }
}

export const updateHabit = async (_id: string, updates: Partial<IHabit>) => {
    console.log("on h service");
    console.log("updates", updates, _id);

    try {
        const res = await axios.patch(`${import.meta.env.VITE_API_URL}/myHabits/${_id}`, updates);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update a habit");
    }
}