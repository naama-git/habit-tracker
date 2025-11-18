import React from "react";
import { Card, Typography, Space, Tag, Divider } from "antd";
import { DeleteOutlined, CalendarOutlined, ClockCircleOutlined, StarOutlined } from "@ant-design/icons";
import type { IHabit } from "../../../types/IHabit";
import "./OneHabit.css";


const { Title, Text, Paragraph } = Typography;

interface OneHabitViewProps {
    habit: IHabit;
    onDelete?: () => void;
}

const COLORS = {
    primary: "#daeb28",
    icon: "#320988",
    text: "black",
};

const OneHabitView: React.FC<OneHabitViewProps> = ({ habit, onDelete }) => {

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

    return (
        <div className="container">
            {/* <Divider style={{ backgroundColor: "#1a1a1a", height: "2" }} type="vertical"></Divider> */}
            <div className="card-wrapper">


                <Card className="habit-card">
                    <Title className="habit-title">{habitName}</Title>

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
                </Card>
            </div>
            {/* <Divider style={{ backgroundColor: "black" }}></Divider> */}
        </div>
    );
}

export default OneHabitView
