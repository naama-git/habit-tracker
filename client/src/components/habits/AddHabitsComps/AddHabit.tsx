
/*----------------------------------------------------------------------------
 🧩 Component :AddHabit
 📃 Description : A logic and API for add Habit
------------------------------------------------------------------------------*/

import { Button } from 'antd'
import React, { useState } from 'react'
import AddHabitView from './AddHabitView'
import type { IHabit } from '../../../types/IHabit'
import { useHabitContext } from '../../../context/HabitContext'
import { useNotificationContext } from '../../../context/NotificationContext'
import { useHabitStore } from '../../../store/HabitStore'


const AddHabit: React.FC = () => {

    const [habitDraft, setHabitDraft] = useState<Partial<IHabit>>({})
    const { userTags } = useHabitContext()

    const { addHabit } = useHabitStore();

    // ------ 🎨states for view ------

    const [open, setOpen] = useState<boolean | undefined>(false)

    const { openNotification, contextHolder } = useNotificationContext()

    // ------ change the habit draft accrding to input change events
    const handleChange = (field: keyof (IHabit), value: any) => {
        setHabitDraft({ ...habitDraft, [field]: value })
    }

    // ------- responsible for start date & end date
    const changeDates = (value?: { a: Date, b: Date }) => {
        console.log("value", value);
        if (!value) return
        if (value.a) {
            setHabitDraft((prev) => ({ ...prev, startDate: value.a }))
        }

        if (value.b)
            setHabitDraft((prev) => ({ ...prev, endDate: value.b }))
    }

    //------ 🧠 validate fields -------

    const checkFieds = () => {
        if (!habitDraft.habitName || !habitDraft.frequency || !habitDraft.time) {
            console.log("Fields are Required");
            openNotification("error", "Required Fields are Empty")
            return;
        }
        if (!habitDraft.startDate)
            setHabitDraft({ ...habitDraft, startDate: new Date() })
        const habit: IHabit = {
            ...habitDraft,
            startDate: habitDraft.startDate || new Date(),
            tag: userTags,
        } as IHabit;
        sendHabit(habit)
    }

    // ----- send habit to server -----
    const sendHabit = async (habit: IHabit) => {

        const token = localStorage.getItem('token')
        if (!token) {
            console.log("Please Log In First");
            openNotification("error", "Please Log In First");
            return;
        }


        addHabit(habit, token)

        setHabitDraft({})
        setTimeout(() => {
            setOpen(false)
        }, 1000)



    }

    // useEffect(() => {
    //     console.log("habitDraft:", habitDraft);
    // }, [habitDraft])

    const clickOK = () => {
        checkFieds()
    }

    return (
        <div>
            {/* notification */}

            {contextHolder}

            {/* add Habit View  */}
            <Button type="primary" onClick={() => setOpen(true)} style={{ color: "black", fontWeight: "600", border: "none", padding: "0 20px", height: "42px", }}>
                Add Habit
            </Button>

            {
                open && <AddHabitView
                    open={open}
                    onCancel={() => setOpen(false)}
                    handleChange={handleChange}
                    changeDates={changeDates}
                    clickOK={clickOK}
                />
            }

        </div>
    )
}

export default AddHabit
