import React, { useState } from "react";
import {Input, Divider, DatePicker, TimePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import "./updatsHabit.css";
import { useHabitStore } from "../../../store/HabitStore";
import AddHabit_SelectTag from "../AddHabitsComps/AddHabit_SelectTag";
// import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "../OneHabit/OneHabit.css"

// const { Title } = Typography;
const { TextArea } = Input;


const UpdateHabitView: React.FC = () => {
    const { habit } = useHabitStore()
    // const {
    //     habitName,
    //     description,
    //     tag = [],
    //     frequency,
    //     startDate,
    //     endDate,
    //     time,
    // } = habit;
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "HH:mm";
    const [form, setForm] = useState({ ...habit })

    return (

        <div>
           
            <Input
                className="habit-title-input"
                value={form.habitName}
                onChange={(e) => setForm({ ...form, habitName: e.target.value })}
                variant="borderless" // ללא מסגרת כדי להיראות כמו טקסט
                placeholder="Habit Name"
                style={{fontSize:"50px"}}

            />
           

            {/* תיאור */}
            <TextArea
                className="habit-description-input"
                value={form.description}
                // onChange={(e) => setUpdatedHabit({ ...updatedHabit, description: e.target.value })}
                variant="borderless"
                placeholder="Description..."
                autoSize={{ minRows: 1, maxRows: 3 }}
            />

            {/* תגיות - Select מרובה */}

            <AddHabit_SelectTag variant="underlined" />

            <Divider className="habit-divider" />

            <div className="parameters">
                {/* תדירות */}
                <div className="habit-row edit-row">
                    <span>Frequency:</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <InputNumber
                            min={1}
                            max={7}
                            variant="borderless"
                            value={form.frequency}
                            // onChange={(val) => setUpdatedHabit({ ...updatedHabit, frequency: val || 0 })}
                            style={{ width: 60, fontWeight: 'bold', textAlign: 'right' }}
                        />
                        <strong>/ week</strong>
                    </div>
                </div>

                {/* שעה */}
                <div className="habit-row edit-row">
                    <span>Time:</span>
                    <TimePicker
                        value={form.time ? dayjs(form.time, timeFormat) : null}
                        format={timeFormat}
                        variant="borderless"
                        allowClear={false}
                        // onChange={(_, timeString) => setUpdatedHabit({ ...updatedHabit, time: timeString as string })}
                        style={{ fontWeight: 'bold', width: 100, direction: 'rtl' }}
                    />
                </div>

                {/* תאריך התחלה */}
                <div className="habit-row edit-row">
                    <span>Start:</span>
                    <DatePicker
                        value={form.startDate ? dayjs(form.startDate) : null}
                        format={dateFormat}
                        variant="borderless"
                        allowClear={false}
                        // onChange={(date) => setUpdatedHabit({ ...updatedHabit, startDate: date?.toDate() || new Date() })}
                        style={{ fontWeight: 'bold', width: 120 }}
                    />
                </div>

                {/* תאריך סיום */}
                <div className="habit-row edit-row">
                    <span>End:</span>
                    <DatePicker
                        value={form.endDate ? dayjs(form.endDate) : null}
                        format={dateFormat}
                        variant="borderless"
                        placeholder="No End Date"
                        // onChange={(date) => setUpdatedHabit({ ...updatedHabit, endDate: date?.toDate() || undefined })}
                        style={{ fontWeight: 'bold', width: 120 }}
                    />
                </div>
            </div>


        </div>
        // <div>

        //     <Title
        //         level={1}
        //         editable={{
        //             icon: <EditOutlined style={{ fontSize: "20px", color: "grey", marginRight: "3px" }} />,
        //             enterIcon: null,
        //         }}
        //     >
        //         {form.habitName}
        //     </Title>

        //     {/* Description */}
        //     <Input.TextArea
        //         value={form.description}
        //         onChange={(e) => setForm({ ...form, description: e.target.value })}
        //         placeholder="Description"
        //         variant="underlined"
        //         autoSize={{ minRows: 2, maxRows: 4 }}

        //     />
        //     <Text
        //         editable={{
        //             icon: <EditOutlined style={{ fontSize: "20px", color: "grey", marginRight: "3px" }} />,
        //             enterIcon: null,
        //         }}
        //     >{description}</Text>

        //     {/* // add existing tags */}
        //     <AddHabit_SelectTag variant="underlined" />


        //     <Divider className="habit-divider"></Divider>

        //     <div className="parameters" >

        //         {/* Frequency */}
        //         <div className="habit-row-edit">
        //             <span>Frequency:</span>
        //             <Input
        //                 type="number"
        //                 min={1}

        //                 //  value={form.frequency}
        //                 // onChange={(e) => setForm({ ...form, parseint(frequency: e.target.value)  })}

        //                 variant="underlined"
        //                 style={{
        //                     width: 100,
        //                     textAlign: "right",
        //                     borderBottom: "2px solid #ccc"
        //                 }}
        //             />
        //             <span style={{ marginLeft: 6 }}>/ week</span>
        //         </div>
        //         <div className="habit-row">
        //             <span>Frequency:</span>
        //             <Text
        //                 strong
        //                 editable={{
        //                     icon: <EditOutlined style={{ fontSize: "20px", color: "grey", marginRight: "3px" }} />,
        //                     enterIcon: null,
        //                 }}
        //             >{frequency} / week</Text>
        //         </div>

        //         <div className="habit-row">
        //             <span>Time:</span>
        //             <TimePicker format={format} style={{ width: "100%" }} placeholder='HH:MM' showNow={true} variant="underlined" />
        //             <strong>{time}</strong>
        //         </div>
        //         <DatePicker.RangePicker
        //             placeholder={['Start Date', 'End Date']}
        //             allowEmpty={[false, true]}
        //             variant="underlined"
        //             onChange={(date, dateString) => {

        //                 if (date) {
        //                     const a = date[0]?.toDate()
        //                     const b = date[1]?.toDate()
        //                     // console.log({ a, b });

        //                     // changeDates({ a, b })
        //                 }

        //             }}
        //             style={{ width: "100%" }}
        //             size='large'
        //         />

        //         <div className="habit-row">
        //             <span>Start:</span>
        //             <strong>{formatDate(startDate)}</strong>
        //         </div>

        //         {endDate && (
        //             <div className="habit-row">
        //                 <span>End:</span>
        //                 <strong>{formatDate(endDate)}</strong>
        //             </div>
        //         )}
        //     </div>

        // </div>

    );
}

export default UpdateHabitView
