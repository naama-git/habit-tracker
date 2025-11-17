import React from 'react'
import { useHabitStore } from '../../../store/HabitStore'

type OneHabitProps = {
  _id: string
}

const OneHabit: React.FC<OneHabitProps> = ({ _id }) => {

  const { getOneHabit, error, loading, habit } = useHabitStore()

  const getHabit = () => {
    getOneHabit(_id)

    if (error) {
      console.log(error);

    }
    else {
      console.log(habit);
    }
  }
  
  return (
    <div>

    </div>
  )
}

export default OneHabit
