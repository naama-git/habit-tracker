
/*----------------------------------------------------------------------------
 🧩 Component : SignUp
 📃 Description : Sign up form component
------------------------------------------------------------------------------*/

import { Form, Input, Button, notification, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { IUser } from "../../types/IUser";
import { useUserStore } from "../../store/UserStore";


const SignUp: React.FC = () => {
  const [form] = Form.useForm();

  //----- user object-----
  const [user, setUser] = useState<IUser | null>(null)

  const { signUp, error } = useUserStore();

  //----- disable submit button -----
  const [disable, setDisable] = useState<boolean>(true)

  //----- 🎨 Notification API -----
  const [api, contextHolder] = notification.useNotification();

  //-----🧠 Logic: sends user data to server -----
  const sendUserData = async (user: IUser | null) => {
    if (!user) return;

    signUp(user)
    if (error) {
      openNotification("error", error)
    }
    else {
      openNotification("success", user.userName + " successfully signed up")
    }
    resetFields();

  }

  //----- opens the notification massage in case of success or error -----
  const openNotification = (type: "success" | "error", message: string, path?: string) => {
    api[type]({
      message,
      description: path ? `check your ${path} field` : undefined,
    })
  }

  //----- Function to send data -----
  const sendData: Function = () => {
    sendUserData(user);
  }


  //----- Reset form fields -----
  const resetFields = () => {
    form.resetFields();
    setUser(null);
    setDisable(true);
  }

  //----- if all fields are filled enable submit button -----
  useEffect(() => {
    if (user?.userName && user?.email && user?.password) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [user])

  //-----🎨 Form fields -----
  const fields: FormItem[] = [
    {
      name: 'Name',
      rules: [{ required: true, message: 'Please input your name!' }],
      children: (
        <Input
          placeholder="Enter your name" size="large" onChange={(e) => setUser({ ...user, userName: e.target.value })} value={user?.userName}
        />
      ),
    },
    {
      name: 'email',
      rules:
        [{ required: true, message: 'Please input your email!' },
        { type: "email", message: "Please enter a valid email" }],
      children: <Input placeholder="Enter your email" size="large" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user?.email}
      />,
    },
    {
      name: 'password',
      rules: [{ required: true, message: 'Please input your password!' }],
      children: (
        <Input.Password
          placeholder="Enter your password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          size="large" onChange={(e) => setUser({ ...user, password: e.target.value })} value={user?.password}
        />
      ),
    },

  ];
  return (
    <>

      {/* notification */}
      {contextHolder}


      {/* form */}
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        style={{ marginTop: "40px", maxWidth: "400px" }}>


        {/* fields of form */}
        {fields.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            rules={field.rules}
          >
            {field.children}
          </Form.Item>
        ))}


        {/* submit button */}
        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={disable}
          style={{
            borderRadius: 10,
            // background: "#320988",
            border: "none",
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
          onClick={() => sendData()}
        >

          Submit
        </Button>
      </Form>
    </>
  )
}

export default SignUp
