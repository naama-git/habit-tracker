import React from 'react'
import UpdateHabitView from './UpdateHabitView'
import { Space, Form } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styles from './UpdateHabit.module.css'
import { useHabitStore } from '../../../store/HabitStore'
import dayjs from 'dayjs'
import type { IHabit } from '../../../types/IHabit'
import { useHabitContext } from '../../../context/HabitContext'
import { useMessageContext } from '../../../context/MessageContext'


interface UpdateHabitProps {
  onEditMode: boolean,
  setOnEditMode: () => void
}

const UpdateHabit: React.FC<UpdateHabitProps> = ({ onEditMode, setOnEditMode }) => {

  const [form] = Form.useForm();
  const {openMessage}=useMessageContext()
  const { habit, updateHabit } = useHabitStore()
  const { userTags } = useHabitContext()

  const timeFormat = "HH:mm";
  const dateFormat = "YYYY-MM-DD";

  const initialFormValues = {
    habitName: habit.habitName,
    description: habit.description,
    frequency: habit.frequency,
    startDate: habit.startDate ? dayjs(habit.startDate, dateFormat) : null,
    endDate: habit.endDate ? dayjs(habit.endDate, dateFormat) : null,
    time: habit.time ? dayjs(habit.time, timeFormat) : null
  }


  // onFinish - update habit
  const onFinish = (values: IHabit) => {
    values.time = dayjs(values.time).format('HH:mm')
    console.log(userTags);
    values.tag = userTags;
    updateHabit(habit._id, values)
    openMessage("success", "Habit Updated Successfully")
    setOnEditMode();

  }

  return (
    <>

      {
        onEditMode &&
        <div>
          <Space >
            <CloseOutlined
              onClick={() => setOnEditMode()}
              className={styles['cancel']}
            />
          </Space>
          <UpdateHabitView
            form={form}
            initialValues={initialFormValues}
            onFinish={onFinish}
          />
         
        </div>
      }
    </>
  )

}

export default UpdateHabit
