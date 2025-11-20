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

const { TextArea } = Input;

const UpdateHabitView: React.FC = () => {

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
    
    return (

        <>
            <div className={styles['in']}>
                {/* habitName */}
                <Input
                    className={styles['input-habit-name']}
                    value={form.habitName}
                    onChange={(e) => setForm({ ...form, habitName: e.target.value })}
                    variant="filled"
                    placeholder="Habit Name"
                    ref={inputRef}
                />


                {/* description*/}
                <div className={styles['input-description']}>
                    <TextArea
                        value={form.description}
                        // onChange={(e) => setUpdatedHabit({ ...updatedHabit, description: e.target.value })}
                        placeholder="Description..."
                        autoSize={{ minRows: 1, maxRows: 3 }}
                        style={{ textAlign: "center" }}
                        variant="filled"
                    />
                </div>

            </div>
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

                            // onChange={(val) => setUpdatedHabit({ ...updatedHabit, frequency: val || 0 })}
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
                        // onChange={(_, timeString) => setUpdatedHabit({ ...updatedHabit, time: timeString as string })}
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
                        // onChange={(date) => setUpdatedHabit({ ...updatedHabit, startDate: date?.toDate() || new Date() })}
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
                        // onChange={(date) => setUpdatedHabit({ ...updatedHabit, endDate: date?.toDate() || undefined })}
                        style={{ width: 120, }}
                    />
                </div>
            </div>
        </>

    );
}

export default UpdateHabitView
