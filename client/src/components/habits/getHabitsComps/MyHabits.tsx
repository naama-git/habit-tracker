
/*----------------------------------------------------------------------------
 🧩 Component : My Habits
 📃 Description : Get user habits from server and another logics.
------------------------------------------------------------------------------*/

import React, { useEffect } from 'react'
import GetHabitsView from './GetHabitsView'
import { useHabitStore } from '../../../store/HabitStore'

const MyHabits: React.FC = () => {

  // ----- state for user habits -----
  const { habits,  error, getHabits } = useHabitStore();
  

  const getData = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return; //add notification
    }
    await getHabits(token)

    if (error) {
      console.log(error);
    }

  }

  // ----- get data when component louding -----
  useEffect(() => {
    getData()
  }, [])


  return (
    <div>
      <GetHabitsView habits={habits} />
    </div>
  )
}

export default MyHabits
