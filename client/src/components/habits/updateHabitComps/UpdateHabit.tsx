import React, { useState } from 'react'
import { useHabitStore } from '../../../store/HabitStore'
import UpdateHabitView from './UpdateHabitView'
import { Button } from 'antd'


interface UpdateHabitProps {
    onEditMode: boolean,
    setOnEditMode: () => void

}

const UpdateHabit: React.FC<UpdateHabitProps> = ({ onEditMode,setOnEditMode }) => {
  const { habit } = useHabitStore()
  


  return (
    <>
    {
      onEditMode && 
      <div>
        <UpdateHabitView/>
        <Button onClick={()=>setOnEditMode()}>cancel</Button>
        <Button>Update</Button>
      </div>
    }
    </>
  )
}

export default UpdateHabit
