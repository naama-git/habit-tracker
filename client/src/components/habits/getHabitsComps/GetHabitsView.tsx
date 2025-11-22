
/*----------------------------------------------------------------------------
 🧩 Component : Get Habits View 
 📃 Description : View for user Habits.
------------------------------------------------------------------------------*/

import React from 'react'
import Masonry from "react-masonry-css";
import { Card, Tag, Typography, Space, Divider } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import type { IHabit } from '../../../types/IHabit';
import DeleteHabit from '../DeleteHabit';
const { Title, Text } = Typography;
import { Link } from 'react-router-dom';
import styles from './GetHabit.module.css';

// ----- props -----
type GetHabitViewProps = {
    habits: IHabit[];
};

const GetHabitsView: React.FC<GetHabitViewProps> = ({ habits }) => {


    // ----- breakpoints for responsive Masonry -----
    const breakpointColumnsObj = {
        default: 4,
        1200: 3,
        800: 2,
        600: 1

    };

    return (
        <div className={styles.wrapper}>
            <div className={styles['container']} >

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {/* habits cards */}

                    {habits.map((habit) => (
                        <div key={habit._id}>
                            <Link to={`${habit._id}`} style={{ textDecoration: "none", color: "#3f4a5a" }}>
                                <Card
                                    key={habit._id}
                                    className={styles['card']}
                                >

                                    {/* delete habit */}
                                    <div className={styles['delete-div']}>
                                        <DeleteHabit _id={habit._id} />
                                    </div>


                                    {/* name of habit */}
                                    <Title
                                        level={3}
                                        className={styles['title']}
                                    >
                                        {habit.habitName}
                                    </Title>

                                    {/* description of habit */}
                                    {habit.description && (
                                        <Text
                                            type="secondary"
                                            style={{
                                                color: "#5f5f5f",
                                            }}
                                            className={styles['text']}
                                        >
                                            {habit.description}
                                        </Text>
                                    )}

                                    {/* another details */}
                                    <Space
                                        direction="vertical"
                                        size={6}
                                        style={{ marginTop: 10, width: "100%" }}
                                    >

                                        {/* start date - end date */}
                                        <Space size={8}>
                                            <CalendarOutlined style={{ color: "#320988" }} />
                                            <Text style={{ fontSize: 13, color: "#333" }}>
                                                {new Date(habit.startDate).toLocaleDateString()}{" "}
                                                {habit.endDate
                                                    ? `- ${new Date(habit.endDate).toLocaleDateString()}`
                                                    : ""}
                                            </Text>
                                        </Space>

                                        {/* time  */}
                                        <Space size={8}>
                                            <ClockCircleOutlined style={{ color: "#320988" }} />
                                            <Text style={{ fontSize: 13, color: "#333" }}>
                                                {habit.time}
                                            </Text>
                                        </Space>
                                    </Space>

                                    {/* tags of habit */}
                                    {habit.tag && habit.tag.length > 0 && (
                                        <div style={{ marginTop: 12, textAlign: "center" }}>
                                            {habit.tag.map((t) => (
                                                <Tag
                                                    key={t}
                                                    color="#daeb28"
                                                    style={{
                                                        color: "#1a1a1a",
                                                    }}
                                                    className={styles['tag']}
                                                > {t}</Tag>
                                            ))}
                                        </div>
                                    )}
                                </Card>
                            </Link>

                            <Divider style={{ backgroundColor: "#1a1a1a", height: "2" }}></Divider>
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    )
}
export default GetHabitsView
