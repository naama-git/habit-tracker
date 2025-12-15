import React from 'react'
import UpdateHabitView from './UpdateHabitView'
import { Space, Form } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styles from './UpdateHabit.module.css'
import { useHabitStore } from '../../../store/HabitStore'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import type { IHabit } from '../../../types/IHabit'
import { useHabitContext } from '../../../context/HabitContext'
import { useMessageContext } from '../../../context/MessageContext'
import { validateDatesForUpdate, frequencyValidationForUpdate } from '../../../utils/habitUtils'


interface UpdateHabitProps {
  onEditMode: boolean,
  setOnEditMode: () => void
}

const UpdateHabit: React.FC<UpdateHabitProps> = ({ onEditMode, setOnEditMode }) => {

  const [form] = Form.useForm();
  const { openMessage } = useMessageContext()
  const { habit, updateHabit } = useHabitStore()
  const { userTags } = useHabitContext()

  dayjs.extend(utc)
  const timeFormat = "HH:mm";
  const dateFormat = "YYYY-MM-DD";
  const startDate = dayjs.utc(habit.startDate, dateFormat);
  const endDate = dayjs.utc(habit.endDate, dateFormat)

  const initialFormValues = {
    habitName: habit.habitName,
    description: habit.description,
    frequency: habit.frequency,
    daysInWeek: habit.daysInWeek,
    daysInMonth: habit.daysInMonth,
    startDate: habit.startDate ? startDate : null,
    endDate: habit.endDate ? endDate : null,
    time: habit.time ? dayjs(habit.time, timeFormat) : null
  }


  // onFinish - update habit
  const onFinish = (values: IHabit) => {
    values.time = dayjs(values.time).format('HH:mm')

    values.tag = userTags;

    let message: { message: String | null }
    message = frequencyValidationForUpdate(habit, values.frequency, values.daysInWeek, values.daysInMonth)
    if (message.message) {
      openMessage("error", message.message)
      return;
    }

    message = validateDatesForUpdate({ startDate: values.startDate, endDate: values.endDate }, { startDate: habit.startDate, endDate: habit.endDate })
    if (message.message) {
      openMessage("error", message.message)
      return;
    }

    const token = localStorage.getItem('token')
    if (!token) {
      openMessage("error", "please log in first")
      return
    }


    console.log(habit);
    
    try {
      updateHabit(habit._id, values, token)
      openMessage("success", "Habit Updated Successfully")
      setOnEditMode();
    } catch (error) {
      console.log(error);

    }
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
