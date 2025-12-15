import React, { createContext, useContext } from "react";
import { message } from "antd";

const MessageContext = createContext<any>(null)


export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [messageApi, contextHolder] = message.useMessage();

    const openMessage = (type: 'success' | 'error' | 'info' | 'warning', content: string) => {
        console.log("type:", type, "message", content);

        messageApi.open({
            type,
            content
        });
    }
    return (
        <MessageContext.Provider value={{ openMessage, contextHolder }}>
            {children}

        </MessageContext.Provider>
    )
}

export const useMessageContext = () => useContext(MessageContext)

