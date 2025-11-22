/*----------------------------------------------------------------------------
 🧩 Component : Update Habit View
 📃 Description : View for Update habit form
------------------------------------------------------------------------------*/

import React, { useState, useRef, useEffect } from "react";
import { Input, Divider, DatePicker, TimePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import { useHabitStore } from "../../../store/HabitStore";
import AddHabit_SelectTag from "../AddHabitsComps/AddHabit_SelectTag";
import styles from './UpdateHabit.module.css'
import type { IHabit } from "../../../types/IHabit";

const { TextArea } = Input;

interface UpdateHabitProps {
    handleChange: (field: keyof (IHabit), value: any) => void
}

const UpdateHabitView: React.FC<UpdateHabitProps> = ({ handleChange }) => {

    const { habit } = useHabitStore()
    
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "HH:mm";
    const [form, setForm] = useState({ ...habit })
    const inputRef = useRef(null);
    useEffect(() => {

        if (inputRef.current) {
            inputRef.current.focus();
        }

    }, []);
   
    const changeView=(field: keyof (IHabit), value: any)=>{
        setForm({...form,[field]:value})
        handleChange(field,value)

    }
    return (

        <>
            <div className={styles['in']}>
                {/* habitName */}
                <Input
                    className={styles['input-habit-name']}
                    value={form.habitName}
                    onChange={(e) => changeView('habitName', e.target.value)}
                    variant="filled"
                    placeholder="Habit Name"
                    ref={inputRef}
                />


                {/* description*/}
                <div className={styles['input-description']}>
                    <TextArea
                        value={form.description}
                        onChange={(e) => changeView('description', e.target.value)}
                        placeholder="Description..."
                        autoSize={{ minRows: 1, maxRows: 3 }}
                        style={{ textAlign: "center" }}
                        variant="filled"
                    />
                </div>

            </div>
            <Divider style={{ borderColor: "#daeb28" }}> Tags </Divider>
            {/* tags*/}
            <div className={styles['habit-tags']}>
                <AddHabit_SelectTag variant="filled" />
            </div>


            <Divider className={styles['habit-divider']} />

            <div className={styles['parameters']}>

                {/* frequency */}
                <div className={styles['habit-row']}>
                    <span>Frequency:</span>
                    <div >
                        <InputNumber
                            min={1}
                            max={30}
                            variant="underlined"
                            value={form.frequency}
                            onChange={(e) => changeView('frequency', e || 1)}
                            style={{ width: 30, textAlign: 'right', color: "#320988" }}
                        />
                        <strong>/ week</strong>
                    </div>
                </div>

                {/* time */}
                <div className={styles['habit-row']}>
                    <span>Time:</span>
                    <TimePicker
                        value={form.time ? dayjs(form.time, timeFormat) : null}
                        format={timeFormat}
                        variant="underlined"
                        allowClear={false}
                        onChange={(_, timeString) => changeView('time', timeString as string)}
                        style={{ width: 100, direction: 'rtl' }}
                    />
                </div>

                {/* start date*/}
                <div className={styles['habit-row']}>
                    <span>Start:</span>
                    <DatePicker
                        value={form.startDate ? dayjs(form.startDate) : null}
                        format={dateFormat}
                        variant="underlined"
                        allowClear={false}
                        onChange={(date) => changeView('startDate', date?.toDate() || new Date())}
                        style={{ width: 120 }}
                    />
                </div>

                {/* end date*/}
                <div className={styles['habit-row']}>
                    <span>End:</span>
                    <DatePicker

                        value={form.endDate ? dayjs(form.endDate) : null}
                        format={dateFormat}
                        variant="underlined"
                        placeholder="No End Date"
                        onChange={(date) => changeView('endDate', date?.toDate() || undefined)}
                        style={{ width: 120, }}
                    />
                </div>
            </div>
        </>

    );
}

export default UpdateHabitView
