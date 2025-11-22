import React, { useState } from 'react'
import UpdateHabitView from './UpdateHabitView'
import { Button, Space } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import styles from './UpdateHabit.module.css'
import { useHabitStore } from '../../../store/HabitStore'
import type { IHabit } from '../../../types/IHabit'
import { useParams } from 'react-router-dom'

interface UpdateHabitProps {
  onEditMode: boolean,
  setOnEditMode: () => void
}



const UpdateHabit: React.FC<UpdateHabitProps> = ({ onEditMode, setOnEditMode }) => {

  const { updateHabit, error } = useHabitStore()
  const [updates, setUpdates] = useState<Partial<IHabit>>({})
  const { _id } = useParams<string>()

  const handleChange = (field: keyof (IHabit), value: any) => {
    if (value && value != "")
      setUpdates({ ...updates, [field]: value })
  }

  const check = () => {
    console.log("checked");
    sendData()

  }

  const sendData = () => {
    if (!_id) return;
    updateHabit(_id, updates)
    if (error) {
      console.log(error);

    }

  }


  return (
    <>
      {
        onEditMode &&
        <div  >

          <Space >
            <CloseOutlined
              onClick={() => setOnEditMode()}
              className={styles['cancel']}
            />
          </Space>
          <UpdateHabitView handleChange={handleChange} />
          <Button
            icon={<CheckOutlined />}
            className={styles['save-button']}
            onClick={() => check()}>
            save
          </Button>
        </div>
      }
    </>
  )
}

export default UpdateHabit
