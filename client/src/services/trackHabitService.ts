import axios, { AxiosError } from "axios";
import type { IError } from "../types/IError";


const handlingErrors = (err: any, message: string) => {

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
            throw { message }
        }
        else {
            console.error('An unknown error occurred:', err);
            throw { message: "An unknown error occurred" }
        }
    }
}


export const trackHabit = async (_id: string, token: string, done: boolean, logDate: Date) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/myHabits/${_id}`,{done,logDate}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return res.data
    } catch (error) {
        handlingErrors(error, "failed to track habit")
    }
}
