import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ConfigProvider from 'antd/es/config-provider/index'
import { NotificationProvider } from './context/NotificationContext.tsx'
import { HabitProvider } from './context/HabitContext.tsx'
import { MessageProvider } from './context/MessageContext.tsx'

const sharedFieldStyle = {
  colorBgContainer: "transparent",
  colorBorder: "black",//"#320988",
  activeBorderColor: "#daeb28",
  hoverBorderColor: "#daeb28",
  colorText: "black",
};


createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#daeb28",
        colorText: "black",
        colorBgContainer: "#f3f2f2ff",   // רקע כרטיסים/קומפוננטות
        colorBgLayout: "#ECECEC",      // רקע עמוד\סקשן
        // colorInfo: "#320988",
        colorIcon: "#320988",
        // colorBorder:"#320988",    
      },
      components: {

        Input: sharedFieldStyle,
        InputNumber: sharedFieldStyle,
        Select: sharedFieldStyle,
        DatePicker: sharedFieldStyle,

      },

    }}
  >

    <StrictMode>
      <NotificationProvider>
        <HabitProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </HabitProvider>
      </NotificationProvider>
    </StrictMode>
  </ConfigProvider>
)
