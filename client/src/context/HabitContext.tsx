
import React, { createContext, useState, useContext } from "react";
import { tags } from '../components/habits/AddHabitsComps/Fields/fieldsForAddHabit'
// import type { SelectProps } from 'antd';

const HabitContext = createContext<any>(null);


export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [items, setItems] = useState<{ value: string }[]>([...tags])
  const [userTags, setUserTags] = useState<string[]>([])

  return (
    <HabitContext.Provider value={{ items, setItems, userTags, setUserTags }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabitContext = () => useContext(HabitContext);
