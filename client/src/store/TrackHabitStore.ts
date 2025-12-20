
import { create } from "zustand";
import { getHabits, addHabit, deleteHabit, getOneHabit, updateHabit } from "../services/habitService";
import type { IHabit } from "../types/IHabit";
import { useUserStore } from "./UserStore";
import type { IError } from "../types/IError";