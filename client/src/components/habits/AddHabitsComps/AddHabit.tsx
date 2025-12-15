
/*----------------------------------------------------------------------------
 🧩 Component :AddHabit
 📃 Description : A logic and API for add Habit
------------------------------------------------------------------------------*/

import { Button, Form } from 'antd'
import React, { useState } from 'react'
import AddHabitView from './AddHabitView'
import type { IHabit } from '../../../types/IHabit'
import { useHabitContext } from '../../../context/HabitContext'
import { useHabitStore } from '../../../store/HabitStore'
import { useMessageContext } from '../../../context/MessageContext'
import dayjs from 'dayjs'
import { datesValidation, frequencyValidation } from '../../../utils/habitUtils'



const AddHabit: React.FC = () => {

    const { userTags } = useHabitContext()
    const [form] = Form.useForm()

    const addHabit = useHabitStore((state) => state.addHabit);

    // ------ 🎨states for view ------

    const [open, setOpen] = useState<boolean | undefined>(false)
    const [disabled, setDisabled] = useState<boolean>(true)

    const { openMessage } = useMessageContext()

    // ----- send habit to server -----
    const sendHabit = (habit: IHabit) => {

        const token = localStorage.getItem('token')
        if (!token) {
            console.log("Please Log In First");
            openMessage("error", "Please Log In First");
            return;
        }
        try {
            addHabit(habit, token)
            openMessage("success", "Habit Added Successfully")
            setTimeout(() => {
                setOpen(false)
            }, 1000)
        } catch (error) {
            openMessage("error", error)
        }

    }

    // checks whether required fields are exists
    const requiredFieldsValidation = (habit: IHabit): boolean => {
        if (habit.habitName && habit.frequency && habit.time) {
            return false
        }
        return true
    }


    const onValuesChange = (_: any, allValues: any) => {
        setDisabled(requiredFieldsValidation(allValues));
    }
  
    const onFinish = (values: any) => {


        let message: { message: String | null }

        message = datesValidation(values.dateRange?.[0], values.dateRange?.[1])
        if (message.message) {
            openMessage("error", message.message)
            return;
        }

        message = frequencyValidation(values.frequency, values.daysInWeek, values.daysInMonth)
        if (message.message) {
            openMessage("error", message.message)
            return;
        }
        form.resetFields()

        let today=new Date()
        today.setHours(0,0,0,0)
        let habit = {
            habitName: values.habitName,
            description: values.description,
            frequency: values.frequency,
            daysInMonth: values.daysInMonth,
            daysInWeek: values.daysInWeek,
            startDate: values.dateRange?.[0] ? new Date(values.dateRange[0].format("YYYY-MM-DD")) : today,
            endDate: values.dateRange?.[1] ? new Date(values.dateRange[1].format("YYYY-MM-DD")) : undefined,
            time: dayjs(values.time).format('HH:mm').toString(),
            tag: userTags
        }
        try {
            console.log(habit);

            sendHabit(habit as IHabit)
        } catch (err) {
            openMessage("error", err)
        }


    }

    return (
        <div>

            {/* add Habit View  */}
            <Button type="primary" onClick={() => setOpen(true)} style={{ color: "black", fontWeight: "600", border: "none", padding: "0 20px", height: "42px", }}>
                Add Habit
            </Button>

            {
                open && <AddHabitView
                    onValuesChange={onValuesChange}
                    open={open}
                    onCancel={() => setOpen(false)}
                    form={form}
                    onFinish={onFinish}
                    disabled={disabled}
                />
            }

        </div>
    )
}
export default AddHabit



