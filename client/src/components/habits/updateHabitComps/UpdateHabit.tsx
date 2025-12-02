import React, { use, useEffect } from 'react'
import UpdateHabitView from './UpdateHabitView'
import { Space, Form } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styles from './UpdateHabit.module.css'
import { useHabitStore } from '../../../store/HabitStore'
import dayjs from 'dayjs'
import type { IHabit } from '../../../types/IHabit'
// import { useParams } from 'react-router-dom'

// import dateValidation from '../../../utils/habitUtils'

interface UpdateHabitProps {
  onEditMode: boolean,
  setOnEditMode: () => void
}

type Errors = {
  habitName?: string
  time?: string
  frequency?: string
  dates?: string
  endDate?: string

}


const UpdateHabit: React.FC<UpdateHabitProps> = ({ onEditMode, setOnEditMode }) => {

  const [form] = Form.useForm();
  const { habit, updateHabit } = useHabitStore()

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
    values.time =  dayjs(values.time).format('HH:mm') 
    updateHabit(habit._id, values)
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

  // const [form] = Form.useForm();
  // const { habit } = useHabitStore()




  // // global states
  // const { updateHabit, error } = useHabitStore()

  // // the user updates
  // const [updates, setUpdates] = useState<Partial<IHabit>>({})

  // // habit _id
  // const { _id } = useParams<string>()

  // // local errors
  // const [errors, setErrors] = useState<Errors>({})


  // // onChange to the form fields
  // // const handleChange = (field: keyof (IHabit), value: any) => {
  // //   if (value && value != "")
  // //     setUpdates({ ...updates, [field]: value })
  // // }


  // // validation before sending
  // const check = () => {
  //   // dateValidation(updates.startDate,updates.endDate)
  //   sendData()

  // }
  // // sends data
  // const sendData = () => {
  //   if (!_id) return;
  //   updateHabit(_id, updates)
  //   if (error) {
  //     console.log(error);

  //   }

  // }


  // return (
  //   <>
  //     {
  //       onEditMode &&
  //       <Form
  //         form={form}

  //       >

  //         <Space >
  //           <CloseOutlined
  //             onClick={() => setOnEditMode()}
  //             className={styles['cancel']}
  //           />
  //         </Space>
  //         <UpdateHabitView form={form} />
  //         <Button
  //           icon={<CheckOutlined />}
  //           className={styles['save-button']}
  //           onClick={() => check()}>
  //           save
  //         </Button>
  //       </Form>
  //     }
  //   </>
  // )
}

export default UpdateHabit
