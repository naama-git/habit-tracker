import React, { useEffect } from 'react'
import { useHabitStore } from '../../../store/HabitStore'
import { useParams } from 'react-router-dom'
import OneHabitView from "./OneHabitView"
import { useShallow } from 'zustand/shallow'
import { useNotificationContext } from '../../../context/NotificationContext'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'



const OneHabit: React.FC = () => {

  const { getOneHabit, clearStoreStatus } = useHabitStore()
  const { error, loading, habit, success } = useHabitStore(useShallow((state) => ({
    error: state.error,
    loading: state.loading,
    habit: state.habit,
    success: state.success
  })))

  const { _id } = useParams()

  const { openNotification } = useNotificationContext()

  const getHabit = () => {
    if (!_id) return;
    getOneHabit(_id)
  }

  useEffect(() => {
    getHabit()
    clearStoreStatus()
  }, [])

  useEffect(() => {

    if (success && !loading) {
      clearStoreStatus()
      return
    }
    if (error.message && !error.errors) {
      openNotification("error", error.message, null, error.status)
      clearStoreStatus()
    }
    else if (error.errors && error.errors.length > 0) {
      const description = error.errors.map(err => err.msg).join("\n")
      openNotification("error", error.message, description, error.status)
      clearStoreStatus()
    }
  }, [error, success, loading])



  return (
    <div>
      {
        loading ?
          <Spin indicator={<LoadingOutlined spin />} size="large" />
          :
          <OneHabitView habit={habit} />
      }

    </div>
  )
}

export default OneHabit
