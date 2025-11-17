import React, { useEffect } from 'react'
import { useHabitStore } from '../../../store/HabitStore'
import { useParams } from 'react-router-dom'



const OneHabit: React.FC = () => {

  const { getOneHabit, error, habit } = useHabitStore()
  const { _id } = useParams()

  const getHabit = () => {
    if (!_id) return;

    getOneHabit(_id)

    if (error) {
      console.log(error);

    }
    else {
      console.log(habit);
    }
  }


  useEffect(() => {
    getHabit()
  }, [])



  return (
    <div>

    </div>
  )
}

export default OneHabit
