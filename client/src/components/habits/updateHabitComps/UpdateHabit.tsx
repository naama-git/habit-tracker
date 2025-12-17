import React, { useEffect } from 'react'
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
import { useShallow } from 'zustand/shallow'
import { useNotificationContext } from '../../../context/NotificationContext'


interface UpdateHabitProps {
  onEditMode: boolean,
  setOnEditMode: () => void
}

const UpdateHabit: React.FC<UpdateHabitProps> = ({ onEditMode, setOnEditMode }) => {

  const [form] = Form.useForm();
  const { openMessage } = useMessageContext()
  const { updateHabit, clearStoreStatus } = useHabitStore()
  const { habit, error, loading } = useHabitStore(useShallow(state => ({
    habit: state.habit,
    error: state.error,
    loading: state.loading,
    success: state.success
  })))
  const { openNotification } = useNotificationContext()

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
  const onFinish = async (values: IHabit) => {
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
    await updateHabit(habit._id, values, token)
  
    openMessage("success", "Habit Updated Successfully")
    clearStoreStatus()
    setOnEditMode()

  }


  useEffect(() => {

    if (error.message && !error.errors) {
      openNotification("error", error.message, null, error.status)
      clearStoreStatus()
    }
    else if (error.errors && error.errors.length > 0) {
      const description = error.errors.map(err => err.msg).join("\n")
      openNotification("error", error.message, description, error.status)
      clearStoreStatus()
    }
  }, [error])


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
            loading={loading}
          />

        </div>
      }
    </>
  )

}

export default UpdateHabit
