
/*----------------------------------------------------------------------------
 🧩 Component : One Habit View
 📃 Description : view for one habit
------------------------------------------------------------------------------*/

import React, { useState } from "react";
import { Card, Typography, Tag, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { IHabit } from "../../../types/IHabit";
import styles from './OneHabit.module.css'
import UpdateHabit from "../updateHabitComps/UpdateHabit";
import { useHabitStore } from "../../../store/HabitStore";

const { Text } = Typography;

// ----- props -----
// interface OneHabitViewProps {
//     habit: IHabit;
// }


const OneHabitView: React.FC = () => {

    // boolean state for edit mode
    const [onEditMode, setOnEditMode] = useState(false)

    const { habit } = useHabitStore();
    const {
        habitName,
        description,
        tag = [],
        frequency,
        startDate,
        endDate,
        time,
    } = habit


    const formatDate = (date: Date | string | null | undefined) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("he-IL");
    };

    return (

        <div className={styles['container']}>

            <div className={styles['card-wrapper']}>

                <Card className={styles['habit-card']}>
                    {!onEditMode &&
                        <div className={styles['in']}>

                            {/* edit icon */}
                            <EditOutlined
                                onClick={() => setOnEditMode(true)}
                                style={{
                                    position: "absolute",
                                    top: 30,
                                    right: 30,
                                    fontSize: '24px',
                                    color: "#320988",
                                    cursor: "pointer",
                                    opacity: 0.8,
                                    transition: "opacity 0.15s ease"
                                }}

                            />

                            {/* habit name */}
                            <h1 className={styles['habit-title']} style={{ fontSize: "40px" }} >{habitName}</h1>

                            {/* habit description */}
                            {description && (
                                <div className={styles['habit-description']}>
                                    <Text >{description}</Text>
                                </div>
                            )}

                            {/* habit tags */}
                            <Divider style={{ borderColor: "#daeb28" }}> Tags </Divider>
                            {tag?.length > 0 && (
                                <div className={styles['habit-tags']} >
                                    {tag.map((t, i) => (
                                        <Tag key={i} className={styles['habit-tag']} >{t}</Tag>
                                    ))}
                                </div>
                            )}

                            <Divider className={styles['habit-divider']}></Divider>


                            <div className={styles['parameters']} >

                                {/* habit frequency */}
                                <div className={styles['habit-row']}>
                                    <span>Frequency:</span>
                                    <strong>{frequency} / week</strong>
                                </div>

                                {/* habit time */}
                                <div className={styles['habit-row']}>
                                    <span>Time:</span>
                                    <strong>{time}</strong>
                                </div>

                                {/* habit start date */}
                                <div className={styles['habit-row']}>
                                    <span>Start:</span>
                                    <strong>{formatDate(startDate)}</strong>
                                </div>

                                {/* habit end-date */}
                                {endDate && (
                                    <div className={styles['habit-row']}>
                                        <span>End:</span>
                                        <strong>{formatDate(endDate)}</strong>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    {
                        // edit mode
                        onEditMode && <UpdateHabit onEditMode={onEditMode} setOnEditMode={() => setOnEditMode(false)} />
                    }

                </Card>


            </div>

        </div>
    );
}

export default OneHabitView
