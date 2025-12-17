
// habit store
// stores the user habits, updates the habit state and sends API calls to habitService
// store by zustand

import { create } from "zustand";
import { getHabits, addHabit, deleteHabit, getOneHabit, updateHabit } from "../services/habitService";
import type { IHabit } from "../types/IHabit";
import { useUserStore } from "./UserStore";
import type { IError } from "../types/IError";



interface HabitState {

    habits: IHabit[]
    habit: IHabit

    loading: boolean;
    error: IError
    success: boolean

    getHabits: (token: string) => Promise<void>;
    addHabit: (habit: IHabit, token: string) => Promise<void>;
    deleteHabit: (_id: string, token: string) => Promise<void>;
    getOneHabit: (_id: string) => Promise<void>;
    updateHabit: (_id: string | undefined, updates: Partial<IHabit>, token: string) => Promise<void>;

    clearStoreStatus: () => void
}


export const useHabitStore = create<HabitState>((set) => ({

    //types & actions
    //initial state
    habits: [],
    habit: {} as IHabit,
    loading: false,
    error: { message: null, status: null, errors: [] },
    success: false,

    // get habit from service 
    getHabits: async (token: string) => {
        set({ loading: true, error: { message: null, status: null, errors: [] }, success: false });
        try {
            const data = await getHabits(token);
            set({ habits: data, loading: false, success: true });
        } catch (err) {
            const error = err as IError
            if (error.message) {
                set({ error: { message: error.message, status: error.status }, success: false })
            }
            else if (error.errors !== undefined && error.errors) {
                if (error.errors?.length > 0) {
                    set({ error: { message: "validation error", status: error.status, errors: error.errors }, success: false })
                }
            }
        }
        finally {
            set({ loading: false })
        }
    },

    // add habit 
    addHabit: async (habit: IHabit, token: string) => {
        set({ loading: true, error: { message: null, status: null, errors: [] }, success: false });

        try {
            const newHabit = await addHabit(habit, token);
            set((state: HabitState) => ({ habits: [...state.habits, newHabit], success: true }));
        } catch (err: any) {
            const error = err as IError
            if (error.message) {
                set({ error: { message: error.message, status: error.status }, success: false })
            }
            else if (error.errors !== undefined && error.errors) {
                if (error.errors?.length > 0) {
                    set({ error: { message: "validation error", status: error.status, errors: error.errors }, success: false })
                }
            }
        } finally {
            set({ loading: false })
        }
    },

    // delete habit
    deleteHabit: async (_id: string, token: string) => {
        set({ loading: true, error: { message: null, status: null, errors: [] }, success: false });
        try {
            await deleteHabit(_id, token);
            set((state: HabitState) => ({ habits: state.habits.filter(h => h._id !== _id), loading: false, success: true }));
        } catch (err) {
            const error = err as IError
            if (error.message) {
                set({ error: { message: error.message, status: error.status }, success: false })
            }
            else if (error.errors !== undefined && error.errors) {
                if (error.errors?.length > 0) {
                    set({ error: { message: "validation error", status: error.status, errors: error.errors }, success: false })
                }
            }
        } finally {
            set({ loading: false })
        }
    },

    // --- get one habit
    getOneHabit: async (_id: string) => {

        set({ loading: true, error: { message: null, status: null, errors: [] }, success: false });
        try {
            const habit = await getOneHabit(_id);
            set(() => ({ habit, loading: false, success: true }));
            console.log("habitstore", habit);

        } catch (err) {
            const error = err as IError
            if (error.message) {
                set({ error: { message: error.message, status: error.status }, success: false })
            }
            else if (error.errors !== undefined && error.errors) {
                if (error.errors?.length > 0) {
                    set({ error: { message: "validation error", status: error.status, errors: error.errors }, success: false })
                }
            }
        } finally {
            set({ loading: false })
        }
    },

    updateHabit: async (_id: string | undefined, updates: Partial<IHabit>, token: string) => {

        if (!_id) {
            return;
        }
        set({ loading: true, error: { message: null, status: null, errors: [] }, success: false });

        try {
            const habit = await updateHabit(_id, updates, token)
            
            set(() => ({ habit, loading: false, success: true }));
            

        } catch (err) {
            const error = err as IError
            if (error.message) {
                set({ error: { message: error.message, status: error.status }, success: false })
            }
            else if (error.errors !== undefined && error.errors) {
                if (error.errors?.length > 0) {
                    set({ error: { message: "validation error", status: error.status, errors: error.errors }, success: false })
                }
            }
        } finally {
            set({ loading: false })
        }
    },

    clearStoreStatus: () => {
        set({ error: { message: null, status: null, errors: [] }, success: false })
    }


}));

useUserStore.subscribe(
    (newState, oldState) => {
        if (newState.token !== oldState.token) {
            useHabitStore.getState().getHabits(newState.token);
            console.log('new user');
        }
    }
)

