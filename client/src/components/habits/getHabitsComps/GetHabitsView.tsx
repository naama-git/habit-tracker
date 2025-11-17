
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
import { Navigate } from 'react-router-dom';
const { Title, Text } = Typography;

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
        <div style={{
            marginTop: "50px", display: "flex", justifyContent: "center",
        }}>
            <div
                style={{
                    width: "100%",
                    maxWidth: "1100px",
                    padding: "0 20px"
                }}
            >

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {/* habits cards */}

                    {habits.map((habit) => (
                        <div key={habit._id}>

                            <a href={`/myHabits/${habit._id}`}>


                                <Card
                                    key={habit._id}
                                    // hoverable
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: 16,
                                        border: "1px solid black",
                                        transition: "all 0.3s ease",
                                        width: "100%"
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget.style.transform = "translateY(-4px)");
                                        // (e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.12)");
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget.style.transform = "translateY(0)");
                                        // (e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.06)");
                                    }}

                                >

                                    {/* delete habit */}
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <DeleteHabit _id={habit._id} />
                                    </div>


                                    {/* name of habit */}
                                    <Title
                                        level={4}
                                        style={{

                                            color: "#2d006b",
                                            fontSize: 20,
                                            marginBottom: 6,
                                            marginTop: "0px",
                                            textAlign: "center",

                                        }}
                                    >
                                        {habit.habitName}
                                    </Title>

                                    {/* description of habit */}
                                    {habit.description && (
                                        <Text
                                            type="secondary"
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                fontSize: 13,
                                                color: "#5f5f5f",
                                                textAlign: "center",
                                                marginBottom: 10,
                                            }}
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

                                        {/* <Space size={8}>
                                <TagOutlined style={{ color: "#7b2ff7" }} />
                                <Text style={{ fontSize: 13, color: "#333" }}>
                                    {habit.frequency}× per week
                                </Text>
                            </Space> */}
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
                                                        fontWeight: 500,
                                                        borderRadius: 8,
                                                        padding: "2px 10px",
                                                        margin: "3px",
                                                        fontSize: 12,
                                                    }}
                                                > {t}</Tag>
                                            ))}
                                        </div>
                                    )}
                                </Card>
                            </a>
                            <Divider style={{ backgroundColor: "#1a1a1a", height: "2" }}></Divider>
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    )
}
export default GetHabitsView
