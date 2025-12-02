import React, { useEffect } from 'react'
import { useHabitStore } from '../../../store/HabitStore'
import { useParams } from 'react-router-dom'
import OneHabitView from "./OneHabitView"



const OneHabit: React.FC = () => {

  const { getOneHabit, error, loading } = useHabitStore()
  const { _id } = useParams()

  const getHabit = () => {
    if (!_id) return;

    getOneHabit(_id)

    if (error) {
      console.log(error);

    }
    else if (loading) {
      console.log("Loading...");
    }
   
  }
  
  useEffect(() => {
    getHabit()
  }, [])



  return (
    <div>
      <OneHabitView />
    </div>
  )
}

export default OneHabit
