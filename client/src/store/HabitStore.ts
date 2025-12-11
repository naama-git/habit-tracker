
// habit store
// stores the user habits, updates the habit state and sends API calls to habitService
// store by zustand

import { create } from "zustand";
import { getHabits, addHabit, deleteHabit, getOneHabit, updateHabit } from "../services/habitService";
import type { IHabit } from "../types/IHabit";
import { useUserStore } from "./UserStore";

// store type

interface HabitState {

    habits: IHabit[]
    habit: IHabit

    loading: boolean;
    error: string | null;

    getHabits: (token: string) => Promise<void>;
    addHabit: (habit: IHabit, token: string) => Promise<void>;
    deleteHabit: (_id: string, token:string) => Promise<void>;
    getOneHabit: (_id: string) => Promise<void>;
    updateHabit: (_id: string | undefined, updates: Partial<IHabit>) => Promise<void>;
}


export const useHabitStore = create<HabitState>((set) => ({

    //types & actions
    //initial state
    habits: [],
    habit: {} as IHabit,
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
            console.log(err);
            
            set({ error: err.message || "Unknown error", loading: false });
        }
    },

    // delete habit
    deleteHabit: async (_id: string, token:string) => {
        set({ loading: true, error: null });
        try {
            await deleteHabit(_id,token);
            set((state: HabitState) => ({ habits: state.habits.filter(h => h._id !== _id), loading: false }));
        } catch (err: any) {
            set({ error: err.message || "Unknown error", loading: false });
        }
    },

    // --- get one habit
    getOneHabit: async (_id: string) => {

        set({ loading: true, error: null });
        try {
            const habit = await getOneHabit(_id);
            set(() => ({ habit, loading: false }));
            console.log("habitstore", habit);

        } catch (err: any) {
            set({ error: err.message || "Unknown error", loading: false });
        }
    },

    updateHabit: async (_id: string | undefined, updates: Partial<IHabit>) => {

        if (!_id) {
            return;
        }
        set({ loading: true, error: null });

        try {
            const habit = await updateHabit(_id, updates)
            set(() => ({ habit, loading: false }));
            // console.log("updated habit", habit)

        } catch (error: any) {
            set({ error: error.message || "Unknown error", loading: false });
            // console.log("error updating habit:", error.message);
        }
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

