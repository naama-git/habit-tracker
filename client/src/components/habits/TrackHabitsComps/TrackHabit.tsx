import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTrackHabitStore } from '../../../store/TrackHabitStore'
import { useShallow } from 'zustand/shallow'
import { useNotificationContext } from '../../../context/NotificationContext'
import TrackHabitView from './TrackHabitView'
import dayjs, { Dayjs } from 'dayjs'
import { useHabitStore } from '../../../store/HabitStore'


const TrackHabit: React.FC = () => {

  const { getHabitTrack, trackHabit, clearStoreStatus } = useTrackHabitStore()
  const { error, loading, track, currentTrack } = useTrackHabitStore(useShallow((state) =>
  ({
    error: state.error,
    loading: state.loading,
    track: state.track,
    currentTrack: state.currentTrack
  })))

  const { habit } = useHabitStore(useShallow((state) =>
    ({ habit: state.habit })))

  const { _id } = useParams<string>()
  const { openNotification } = useNotificationContext()


  // GET the track
  const getTrack = async () => {

    const token = localStorage.getItem('token')
    if (!_id || !token) {
      return
    }
    await getHabitTrack(_id, token)
  }


  // POST a track
  const trackTheHabit = async (logDate: Date, done: boolean) => {
    const token = localStorage.getItem('token')
    if (!_id || !token) {
      return
    }
    await trackHabit(_id, token, logDate, done)
  }

  const onselect = (logDate: Dayjs | undefined, done: boolean | undefined) => {
    console.log("logDate", logDate, "done", done);

    if (!logDate || logDate === undefined || done === undefined) {
      return
    }
    const castDate = logDate.toDate()
    trackTheHabit(castDate, done)
  }


  const checkDaysDisable = (selectedDate: Dayjs): boolean => {
    if (habit.daysInMonth && habit.daysInMonth.length != 0) {
      console.log("hi");
      
      if (!habit.daysInMonth.includes(selectedDate.date())) {
        return true
      }
      else return false
    }
    else if (habit.daysInWeek && habit.daysInWeek.length != 0) {
      if (!habit.daysInWeek.includes(selectedDate.day())) {
        return true
      }
      else return false
    }
    return true
  }
  const checkDisabled = (selectedDate: Dayjs): boolean => {

    const isBeforeStart = selectedDate.isBefore(dayjs(habit.startDate), 'day');

    if (habit.endDate) {
      const isAfterEnd = selectedDate.isAfter(dayjs(habit.endDate), 'day');
      return isBeforeStart || isAfterEnd;
    }

    if (!isBeforeStart) {
      return checkDaysDisable(selectedDate)
    }
    return isBeforeStart
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
  }, [error, loading])

  useEffect(() => {
    getTrack()
    clearStoreStatus()
  }, [])

  return (
    <div>
      <TrackHabitView track={track} currentTrack={currentTrack} onselect={onselect} loading={loading} checDisabled={checkDisabled} />

    </div>
  )
}

export default TrackHabit
