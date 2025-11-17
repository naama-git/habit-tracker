
import React, { createContext, useContext } from "react";
import { notification } from "antd";

const NotificationContext = createContext<any>(null)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [api, contextHolder] = notification.useNotification();

    const statusArr: { status: number, message: string, description?: string }[] = [
        {
            status: 400,
            message: "Bad Request",
            description: "The data sent is invalid or incomplete."
        },
        {
            status: 401,
            message: "Unauthorized",
            description: "Authentication is required or the provided token is invalid."
        },
        {
            status: 403,
            message: "Forbidden",
            description: "You do not have permission to perform this action."
        },
        {
            status: 404,
            message: "Not Found",
            description: "The requested resource was not found."
        },
        {
            status: 409,
            message: "Conflict",
            description: "A conflict occurred — usually because the resource already exists."
        },
        {
            status: 422,
            message: "Unprocessable Entity",
            description: "The server understood the request, but the data is invalid."
        },

        // --- 5xx Server Errors ---
        {
            status: 500,
            message: "Internal Server Error",
            description: "A general server error occurred."
        },
        {
            status: 502,
            message: "Bad Gateway",
            description: "The server received an invalid response from an upstream server."
        },
        {
            status: 503,
            message: "Service Unavailable",
            description: "The service is currently unavailable or overloaded."
        },
        {
            status: 504,
            message: "Gateway Timeout",
            description: "The server did not receive a timely response."
        }
    ]

    //----- opens the notification message in case of success or error -----
    const openNotification = (type: "success" | "error" | "warning" | "info", message?: string, description?: string, status?: number) => {

        api[type]({
            message: message ? message : statusArr.find((item) => item.status === status)?.message,
            description: description ? description : statusArr.find(item => item.status === status)?.description,
        })
    }

    return (
        <NotificationContext.Provider value={{ openNotification, contextHolder }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => useContext(NotificationContext)
