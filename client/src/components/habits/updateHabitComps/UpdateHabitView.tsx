import React, { useState } from "react";
import { Typography, Tag, Divider, Input } from "antd";

// import "./OneHabit.css";
import { useHabitStore } from "../../../store/HabitStore";

const {  Text } = Typography;



const UpdateHabitView: React.FC = () => {
    const { habit } = useHabitStore()
    const {
        habitName,
        description,
        tag = [],
        frequency,
        startDate,
        endDate,
        time,
    } = habit;

    const formatDate = (date: Date | string | null | undefined) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("he-IL");
    };
    const [form, setForm] = useState({ ...habit })

    return (
        <div >

            <Input
                value={form.habitName}
                variant="underlined"
                onChange={(e) => setForm({ ...form, habitName: e.target.value })}
            />

            {description && (
                <Text className="habit-description">{description}</Text>
            )}


            {tag?.length > 0 && (
                <div className="habit-tags" >
                    {tag.map((t, i) => (
                        <Tag key={i} className="habit-tag" style={{ backgroundColor: "#daeb28" }}>{t}</Tag>
                    ))}
                </div>
            )}

            <Divider className="habit-divider"></Divider>

            <div className="parameters" >
                <div className="habit-row">
                    <span>Frequency:</span>
                    <strong>{frequency} / week</strong>
                </div>

                <div className="habit-row">
                    <span>Time:</span>
                    <strong>{time}</strong>
                </div>

                <div className="habit-row">
                    <span>Start:</span>
                    <strong>{formatDate(startDate)}</strong>
                </div>

                {endDate && (
                    <div className="habit-row">
                        <span>End:</span>
                        <strong>{formatDate(endDate)}</strong>
                    </div>
                )}
            </div>

        </div>

    );
}

export default UpdateHabitView
