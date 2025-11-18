import React, { useState } from "react";
import { Card, Typography,  Tag, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { IHabit } from "../../../types/IHabit";
import "./OneHabit.css";
import UpdateHabit from "../updateHabitComps/UpdateHabit";


const { Title, Text } = Typography;

interface OneHabitViewProps {
    habit: IHabit;
}

// const COLORS = {
//     primary: "#daeb28",
//     icon: "#320988",
//     text: "black",
// };

const OneHabitView: React.FC<OneHabitViewProps> = ({ habit }) => {

    const [onEditMode, setOnEditMode] = useState(false)
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
            
            <div className="card-wrapper">

                <Card className="habit-card">
                    {!onEditMode &&
                        <div>
                            <EditOutlined
                                onClick={() => setOnEditMode(true)}
                                style={{
                                    position: "absolute",
                                    top: 30,
                                    right: 30,
                                    fontSize: 24,
                                    color: "#320988",
                                    cursor: "pointer",
                                    opacity: 0.8,
                                    transition: "opacity 0.15s ease"
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
                            />
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
                        </div>
                    }
                    {
                        onEditMode && <UpdateHabit onEditMode={onEditMode} setOnEditMode={()=>setOnEditMode(false)}/>
                    }

                </Card>


            </div>

        </div>
    );
}

export default OneHabitView
