/*----------------------------------------------------------------------------
 🧩 Component : Update Habit View
 📃 Description : View for Update habit form
------------------------------------------------------------------------------*/

import React, { useRef, useEffect } from "react";
import { Input, Divider, DatePicker, TimePicker, Form, type FormInstance, Button, Select, Checkbox, Row, Col, Spin } from "antd";
// import { useHabitStore } from "../../../store/HabitStore";
import AddHabit_SelectTag from "../AddHabitsComps/AddHabit_SelectTag";
import styles from './UpdateHabit.module.css'
import type { IHabit } from "../../../types/IHabit";
const { TextArea } = Input;

interface UpdateHabitProps {
    form: FormInstance
    initialValues: Object
    loading: boolean,
    onFinish: (values: IHabit) => void
}

const UpdateHabitView: React.FC<UpdateHabitProps> = ({ form, initialValues, onFinish, loading }) => {

    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "HH:mm";

    const frequencyValue = Form.useWatch('frequency', form);

    const numbers = Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}`,
        value: i + 1,
    }));


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
                        label=""
                        name="frequency"
                        rules={[{ required: true, message: `Frequency is required` }]}
                    >
                        <Select variant="underlined" placeholder="Select frequency" className={styles["select"]}
                            options={[{ label: "Daily", value: "daily" }, { label: "Weekly", value: "weekly" }, { label: "Monthly", value: "monthly" }]} />
                    </Form.Item>

                </div>

                {
                    frequencyValue === 'weekly' &&
                    <div className={styles['habit-row']}>
                        <span>Day of Week</span>
                        <Form.Item
                            label=""
                            name="daysInWeek"
                            rules={[{ required: true, message: `Please select a day of the week` }]}
                        >
                            <Select
                                variant="underlined"
                                mode="multiple"
                                placeholder="Select Day of week"

                                maxTagCount="responsive"
                                className={styles["select"]}
                                options={[
                                    { label: "Sunday", value: 0 },
                                    { label: "Monday", value: 1 },
                                    { label: "Tuesday", value: 2 },
                                    { label: "Wednesday", value: 3 },
                                    { label: "Thursday", value: 4 },
                                    { label: "Friday", value: 5 },
                                    { label: "Saturday", value: 6 },

                                ]} />
                        </Form.Item>
                    </div>
                }

                {
                    frequencyValue === 'monthly' &&
                    <div className={styles["habit-row"]}>

                        <Form.Item
                            label="Day of the Month"
                            name="daysInMonth"
                            //help="Select one or more days. if the selected day exceeds the number of days in a month, the habit will be scheduled on the last day of that month."
                            rules={[{ required: true, message: "Please select at least one day of the month" }]}
                            style={{ marginBottom: "20px" }}
                        >

                            <Checkbox.Group style={{ width: '100%' }}>
                                <Row gutter={[8, 4]}>
                                    {numbers.map((number) => (
                                        <Col span={4} key={number.value}>
                                            <Checkbox value={number.value}>{number.label}</Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                }


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
                <div className={styles['habit-row']} >
                    <span>End:</span>
                    <Form.Item
                        name="endDate"
                        required={false}>
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
                    className={styles['save-button']}>{loading ? <Spin /> : <>Save</>}</Button>
            </Form.Item>
        </Form>

    );
}

export default UpdateHabitView
