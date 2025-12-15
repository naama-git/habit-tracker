/*----------------------------------------------------------------------------
 🧩 Component : UserDrower
 📃 Description : Opens Drawer for User Authentication - Login, sign up...
------------------------------------------------------------------------------*/


import React, { useState } from 'react'
import { Drawer, Card, Tabs } from "antd"
import Login from '../components/user/Login';
import SignUp from '../components/user/SignUp';


/**
 * params:
 * visible: boolean - determines if the drawer is visible
 * onClose: function - function to close the drawer
 */

const UserDrower: React.FC<{ visible: boolean, onClose: () => void }> = ({ visible, onClose }) => {

    //----- 🎨State to manage active tab -----
    const [activeTab, setActiveTab] = useState("1");
    // 1. הגדרת המערך (בדרך כלל מחוץ ל-return, או כקבוע)
    const items = [
        {
            key: '1',
            label: "Sign in",
            children: (
                <SignUp />
            ),
        },
        {
            key: '2',
            label: "Log in",
            children: (
               <Login/>
            ),
        },
    ];

    // 2. שימוש ברכיב Tabs
    <Tabs
        defaultActiveKey="1"
        items={items} // מעבירים את המערך למאפיין items
    />

    return (
        <div>
            {/*  DrawerSettings */}
            <Drawer
                title="User"
                placement="right"
                onClose={onClose}
                open={visible}
                maskClosable={true}
                style={{ fontWeight: "bold" }}
                styles={{ header: { padding: "40px", borderBottom: "1px solid #daeb28" } }}
            >

                {/* Card with Tabs for SignUp and Login */}
                <Card
                    style={{ height: "100%" }}
                >

                    <Tabs
                        activeKey={activeTab}
                        onChange={key => setActiveTab(key)}
                        type="card"
                        items={items}
                    >
                    </Tabs>

                </Card>

            </Drawer>
        </div>
    )
}

export default UserDrower
