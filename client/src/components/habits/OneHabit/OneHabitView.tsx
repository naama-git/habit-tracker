
/*----------------------------------------------------------------------------
 🧩 Component : One Habit View
 📃 Description : view for one habit
------------------------------------------------------------------------------*/

import React, {  useState } from "react";
import { Card, Typography, Tag, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import styles from './OneHabit.module.css'
import UpdateHabit from "../updateHabitComps/UpdateHabit";
import type { IHabit } from "../../../types/IHabit";

const { Text } = Typography;

interface OneHabitViewProps {
    habit:IHabit
}

const OneHabitView: React.FC<OneHabitViewProps> = ({habit}) => {

    // boolean state for edit mode
    const [onEditMode, setOnEditMode] = useState(false)

    const {
        habitName,
        description,
        tag = [],
        frequency,
        daysInMonth,
        daysInWeek,
        startDate,
        endDate,
        time,

    } = habit


    const days = [
        "Sunday", "Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday"
    ]

    const dateFormat = "YYYY-MM-DD";

    const renderDaysOfMonth = (): React.ReactNode => {
        if (daysInMonth && daysInMonth.length !== 0) {
            return daysInMonth.map(day => {
                return <div className={styles["day"]}>{day}</div>
            })
        }
        else {
            return <strong>no days</strong>
        }

    }
    const renderDaysOfWeek = (): React.ReactNode => {
        if (daysInWeek && daysInWeek.length !== 0) {
            return daysInWeek.map(day => {
                return <div className={styles["day"]}>{days[day]}</div>
            })
        }
        else {
            return <strong>no days</strong>
        }

    }

    return (
        <>
            {
                habit.habitName &&
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
                                            <strong>{frequency}</strong>
                                        </div>

                                        {
                                            daysInMonth && daysInMonth.length > 0 && daysInMonth !== undefined &&
                                            <div className={styles['some-wrapper']}>
                                                <span>Days in Month:</span>
                                                <div className={styles["days-wrapper"]}>
                                                    {renderDaysOfMonth()}
                                                </div>
                                            </div>
                                        }
                                        {
                                            daysInWeek && daysInWeek.length > 0 && daysInWeek !== undefined &&
                                            <div className={styles['some-wrapper']}>
                                                <span>Days in Week:</span>
                                                <div className={styles["days-wrapper"]}>
                                                    {renderDaysOfWeek()}
                                                </div>
                                            </div>
                                        }

                                        {/* habit time */}
                                        <div className={styles['habit-row']}>
                                            <span>Time:</span>
                                            <strong>{time}</strong>
                                        </div>

                                        {/* habit start date */}
                                        <div className={styles['habit-row']}>
                                            <span>Start:</span>

                                            <strong>{dayjs(startDate).format(dateFormat)}</strong>
                                        </div>

                                        {/* habit end-date */}
                                        {endDate && (
                                            <div className={styles['habit-row']}>
                                                <span>End:</span>
                                                <strong>{dayjs(endDate).format(dateFormat)}</strong>
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
            }
        </>

    );
}

export default OneHabitView
