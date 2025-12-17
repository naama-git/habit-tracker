
/*----------------------------------------------------------------------------
 🧩 Component : My Habits
 📃 Description : Get user habits from server and another logics.
------------------------------------------------------------------------------*/

import React, { useEffect } from 'react'
import GetHabitsView from './GetHabitsView'
import { useHabitStore } from '../../../store/HabitStore'
import { useMessageContext } from '../../../context/MessageContext';
import { useShallow } from 'zustand/shallow';
import { useNotificationContext } from '../../../context/NotificationContext';
import {  Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const MyHabits: React.FC = () => {

  // ----- state for user habits -----
  const { getHabits, clearStoreStatus } = useHabitStore()
  const { habits, error, loading,success } = useHabitStore(useShallow(state => ({
    habits: state.habits,
    error: state.error,
    loading: state.loading,
    success:state.success
  })));

  const { openMessage } = useMessageContext()
  const { openNotification } = useNotificationContext()

  const getData = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      openMessage("error", "please log in first")
      return
    }
    getHabits(token)

  }

  // ----- get data when component loading -----
  useEffect(() => {
    getData(),
    clearStoreStatus()
  }, [])

  useEffect(() => {
    if(success){
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
  }, [error,success])


  return (
    <div>
      {
        loading ?
          <Spin indicator={<LoadingOutlined spin />} size="large"/>
          :
          <GetHabitsView habits={habits} />
      }

    </div>
  )
}

export default MyHabits


