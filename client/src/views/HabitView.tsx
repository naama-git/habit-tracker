import React from 'react'
import OneHabit from '../components/habits/OneHabit/OneHabit'
import styles from './viewsCSS/habitView.module.css'
import TrackHabit from '../components/habits/TrackHabitsComps/TrackHabit'

const HabitView = () => {
  return (
    <div className={styles["content"]}>
      <OneHabit/>
      <TrackHabit/>
    </div>
  )
}

export default HabitView
