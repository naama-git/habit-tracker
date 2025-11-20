import React from 'react'
import UpdateHabitView from './UpdateHabitView'
import {  Space } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import styles from './UpdateHabit.module.css'

interface UpdateHabitProps {
  onEditMode: boolean,
  setOnEditMode: () => void

}

const UpdateHabit: React.FC<UpdateHabitProps> = ({ onEditMode, setOnEditMode }) => {
  return (
    <>
      {
        onEditMode &&
        <div >

          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <CloseOutlined
              onClick={() => setOnEditMode()}
              style={{
                position: "absolute",
                top: 30,
                right: 30,
                fontSize: 24,
                color: "#320988",
                cursor: "pointer",
                opacity: 0.8,
                transition: "opacity 0.15s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
            />
            <CheckOutlined

              style={{
                position: "absolute",
                top: 30,
                right: 60,
                fontSize: 24,
                color: "#320988",
                cursor: "pointer",
                opacity: 0.8,
                transition: "opacity 0.15s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
            />
          </Space>
          <UpdateHabitView />
        </div>
      }
    </>
  )
}

export default UpdateHabit
