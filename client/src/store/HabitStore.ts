
// habit store
// stores the user habits, updates the habit state and sends API calls to habitService
// store by zustand

import { create } from "zustand";
import { getHabits, addHabit, deleteHabit, getOneHabit } from "../services/habitService";
import type { IHabit } from "../types/IHabit";

// store type

interface HabitState {

    habits: IHabit[]
    habit: IHabit

    loading: boolean;
    error: string | null;

    getHabits: (token: string) => Promise<void>;
    addHabit: (habit: IHabit, token: string) => Promise<void>;
    deleteHabit: (_id: string) => Promise<void>;
    getOneHabit: (_id: string) => Promise<void>;
}


export const useHabitStore = create<HabitState>((set: any) => ({

    habits: [],
    habit: { habitName: '', frequency: -1, startDate: new Date(), time: "00:00" },
    loading: false,
    error: null,


    // get habit from service 
    getHabits: async (token: string) => {
        set({ loading: true, error: null });
        try {
            const data = await getHabits(token);
            set({ habits: data, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Unknown error", loading: false });
        }
    },

    // add habit 
    addHabit: async (habit: IHabit, token: string) => {
        set({ loading: true, error: null });

        try {
            const newHabit = await addHabit(habit, token);
            set((state: HabitState) => ({ habits: [...state.habits, newHabit], loading: false }));
        } catch (err: any) {
            set({ error: err.message || "Unknown error", loading: false });
        }
    },

    // delete habit
    deleteHabit: async (_id: string) => {
        set({ loading: true, error: null });
        try {
            await deleteHabit(_id);
            set((state: HabitState) => ({ habits: state.habits.filter(h => h._id !== _id), loading: false }));
        } catch (err: any) {
            set({ error: err.message || "Unknown error", loading: false });
        }
    },

    getOneHabit: async (_id: string) => {

        set({ loading: true, error: null });
        try {
            const habit = await getOneHabit(_id);
            set((state: HabitState) => ({ habit: state.habit = habit, loading: false }));
            console.log(habit);

        } catch (err: any) {
            set({ error: err.message || "Unknown error", loading: false });
        }
    }

}));
