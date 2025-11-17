/*----------------------------------------------------------------------------
 🧩 Component : MyHabitsView
 📃 Description : View for managing user habits
------------------------------------------------------------------------------*/

import React from 'react'
import MyHabits from '../components/habits/getHabitsComps/MyHabits'
import AddHabit from '../components/habits/AddHabitsComps/AddHabit'
import { HabitProvider } from '../context/HabitContext'

const MyHabitsView: React.FC = () => {
  return (
    <div style={{ padding: '40px' }}>
      <HabitProvider> <AddHabit /> </HabitProvider>
      <MyHabits/>
    </div>
  )
}

export default MyHabitsView
