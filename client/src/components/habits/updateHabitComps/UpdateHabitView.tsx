/*----------------------------------------------------------------------------
 🧩 Component : Update Habit View
 📃 Description : View for Update habit form
------------------------------------------------------------------------------*/

import React, { useRef, useEffect } from "react";
import { Input, Divider, DatePicker, TimePicker, InputNumber, Form, type FormInstance, Button } from "antd";
// import { useHabitStore } from "../../../store/HabitStore";
import AddHabit_SelectTag from "../AddHabitsComps/AddHabit_SelectTag";
import styles from './UpdateHabit.module.css'
import type { IHabit } from "../../../types/IHabit";
const { TextArea } = Input;

interface UpdateHabitProps {
    form: FormInstance
    initialValues: Object
    onFinish: (values: IHabit) => void
}

const UpdateHabitView: React.FC<UpdateHabitProps> = ({ form, initialValues, onFinish }) => {

    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "HH:mm";

    const inputRef = useRef(null);

    useEffect(() => {

        if (inputRef.current) {
            inputRef.current.focus();
        }

    }, []);

    return (

        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <div className={styles['in']}>

                {/* habitName */}

                <Form.Item
                    name="habitName"
                    label=""
                    rules={[{ required: true, message: "habit name is required" }]}
                >
                    <Input

                        className={styles['input-habit-name']}
                        variant="filled"
                        placeholder="Habit Name"
                        ref={inputRef}
                    />
                </Form.Item>


                {/* description*/}
                <Form.Item
                    className={styles['input-description']}
                    name="description"
                >
                    <TextArea
                        placeholder="Description..."
                        autoSize={{ minRows: 1, maxRows: 3 }}
                        style={{ textAlign: "center" }}
                        variant="filled"
                    />
                </Form.Item>
            </div>



            <Divider style={{ borderColor: "#daeb28" }}> Tags </Divider>

            {/* tags*/}
            <Form.Item
                className={styles['habit-tags']}
                name='tag'>
                <AddHabit_SelectTag variant="filled" />
            </Form.Item>


            <Divider className={styles['habit-divider']} />

            <div className={styles['parameters']}>

                {/* frequency */}

                <div className={styles['habit-row']}>
                    <span>Frequency:</span>
                    <Form.Item
                        name='frequency'
                        rules={[{ required: true, message: "frequency is required" }]}>
                        <InputNumber
                            variant="underlined"
                            style={{ width: 40, color: "#320988" }}
                            min={1}
                            max={30}
                        />
                    </Form.Item>

                </div>

                {/* time */}
                <div className={styles['habit-row']}>
                    <span>Time:</span>
                    <Form.Item
                        name="time"
                        label=""
                        rules={[{ required: true, message: "time is required" }]}>
                        <TimePicker
                            format={timeFormat}
                            variant="underlined"
                            allowClear={false}
                            style={{ width: 120 }}
                        />
                    </Form.Item>
                </div>

                {/* start date*/}
                <div className={styles['habit-row']}>
                    <span>Start:</span>
                    <Form.Item
                        name="startDate"
                    >
                        <DatePicker
                            format={dateFormat}
                            variant="underlined"
                            allowClear={false}
                            style={{ width: 120 }}
                        />
                    </Form.Item>
                </div>

                {/* end date*/}
                <div className={styles['habit-row']}>
                    <span>End:</span>
                    <Form.Item
                        name="endDate">
                        <DatePicker
                            format={dateFormat}
                            variant="underlined"
                            placeholder="No End Date"
                            style={{ width: 120, }}
                        />
                    </Form.Item>
                </div>
            </div>
            <Form.Item>
                <Button
                    htmlType="submit"
                    className={styles['save-button']}>Save</Button>
            </Form.Item>
        </Form>

    );
}

export default UpdateHabitView
