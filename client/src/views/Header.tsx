
/*----------------------------------------------------------------------------
 🧩 Component : Header
 📃 Description : Header component for the application
------------------------------------------------------------------------------*/

import { useState } from "react";
import { Layout, Menu, Drawer, Grid, Button, Divider } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../assets/logoS.svg"
const { useBreakpoint } = Grid;
import '../index.css'
import UserDrower from "./UserDrower"


const Header: React.FC = () => {

  const screens = useBreakpoint();
  const isMobile = screens.md === false;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [showUserDrawer, setShowUserDrawer] = useState(false)
  const token = localStorage.getItem('token')

  const menuItems = [
    {
      key: "homePage", label: <a href="/" style={{ height: "100%", display: "flex", alignItems: "center" }}>
        <img src={logo} height={40} width={40} />
      </a>
    },
    { key: "about", label: <a>About</a>, },
    { key: "myHabits", label: <a href="/myHabits" > My Habits</a> },
    {
      key: "user",
      label:
        <Button style={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }} onClick={() => { setShowUserDrawer(true); setDrawerOpen(false) }} >
          <UserOutlined style={{ fontSize: "20px" }} />
        </Button>
    }
  ];

  return (


    <Layout.Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        background: "transparent",
      }}
    >

      {/* Desktop View */}
      {!isMobile && (

        <Menu
          mode="horizontal"
          items={menuItems}
          style={{ width: "50%", display: "flex", justifyContent: "center", fontSize: "20px", backgroundColor: "transparent" }}
        />

      )}

      {/* mobile view*/}
      {isMobile && (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 20 }} />}
            onClick={() => setDrawerOpen(true)}
          />

          <Drawer

            placement="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}

          >

            <Menu mode="vertical" items={menuItems}
              style={{ height: "40%", display: "flex", flexDirection: "column", justifyContent: "center" }} />
            <Divider style={{ borderColor: "#320988", }} />
          </Drawer>
        </>
      )}


      {/* Opening User Components */}
      <>
        <UserDrower visible={showUserDrawer} onClose={() => {
          setShowUserDrawer(false);
        }} />
      </>


    </Layout.Header>
  );
}

export default Header
