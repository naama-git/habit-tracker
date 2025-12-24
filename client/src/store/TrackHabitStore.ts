
import { create } from "zustand";
import { getHabitTrack, updateHabitTrack } from "../services/trackHabitService";
import type { ITrack } from "../types/ITrack";
import type { IError } from "../types/IError";


interface trackHabitState {
    track: ITrack[]
    currentTrack: ITrack
    error: IError
    loading: boolean

    trackHabit: (_id: string, token: string, logDate: Date, done: boolean) => Promise<void>,
    getHabitTrack: (_id: string, token: string) => Promise<void>,
    clearStoreStatus: () => void
}

export const useTrackHabitStore = create<trackHabitState>((set) => ({

    track: [],
    currentTrack: {} as ITrack,
    error: { message: null, status: null, errors: [] },
    loading: false,


    getHabitTrack: async (_id?: string, token?: string) => {

        if (!_id || !token) {
            return
        }
        set({ loading: true, error: { message: null, status: null, errors: [] } });

        try {
            const data = await getHabitTrack(_id, token);
            set({ track: data.data })
            console.log("trackHabitStore", data.data)

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
        } finally {
            set({ loading: false })
        }

    },

    trackHabit: async (_id: string, token: string, logDate: Date, done: boolean) => {
        set({ loading: true, error: { message: null, status: null, errors: [] } });

        try {
            const data = await updateHabitTrack(_id, token,logDate, done);
            set((state) => ({ track: [state.track, data], currentTrack: data }));
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
        } finally {
            set({ loading: false })
        }


    },

    clearStoreStatus: () => {
        set({ error: { message: null, status: null, errors: [] } })
    }




}))


