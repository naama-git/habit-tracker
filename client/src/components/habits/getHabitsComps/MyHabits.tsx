
/*----------------------------------------------------------------------------
 🧩 Component : My Habits
 📃 Description : Get user habits from server and another logics.
------------------------------------------------------------------------------*/

import React, { useEffect } from 'react'
import GetHabitsView from './GetHabitsView'
import { useHabitStore } from '../../../store/HabitStore'
import { useMessageContext } from '../../../context/MessageContext';

const MyHabits: React.FC = () => {

  // ----- state for user habits -----
  const { habits, error, getHabits } = useHabitStore();

  const { openMessage } = useMessageContext()

  const getData = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      openMessage("error", "please log in first")
      return
    }
    try {
      getHabits(token)
    } catch (err) {
      console.log(err);

    }


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
