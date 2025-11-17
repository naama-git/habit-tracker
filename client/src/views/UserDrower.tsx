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

    return (
        <div>
        {/*  DrawerSettings */}
            <Drawer
                title="User"
                placement="right"
                onClose={onClose}
                open={visible}
                maskClosable={true}
                style={{  fontWeight: "bold" }}
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
                    >
                        {/* signup tab */}
                        <Tabs.TabPane tab="Sign Up" key="1">
                            <SignUp />
                        </Tabs.TabPane>

                        {/* login tab */}
                        <Tabs.TabPane tab="Login" key="2">
                            <Login />

                            {/* if user is not registered, show link to sign up */}
                            <a onClick={() => setActiveTab("1")} >Not registered Yet?</a>

                        </Tabs.TabPane>
                    </Tabs>

                </Card>

            </Drawer>
        </div>
    )
}

export default UserDrower
