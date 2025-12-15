
/*----------------------------------------------------------------------------
 🧩 Component : SignUp
 📃 Description : Sign up form component
------------------------------------------------------------------------------*/

import { Form, Input, Button, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { IUser } from "../../types/IUser";
import { useUserStore } from "../../store/UserStore";
import { useMessageContext } from "../../context/MessageContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { useShallow } from "zustand/shallow";


const SignUp: React.FC = () => {

  const [form] = Form.useForm();

  const { signUp, clearError } = useUserStore()
  const { error, loading, currentUser } = useUserStore(
    useShallow(
      (state) => ({
        error: state.error,
        loading: state.loading,
        currentUser: state.currentUser
      })
    )
  )
  const [disable, setDisable] = useState<boolean>(true)
  const { openMessage } = useMessageContext()
  const { openNotification } = useNotificationContext()

  // send user data to server
  const sendUserData = (user: IUser | null) => {
    if (!user) return;
    signUp(user)
  }

  const resetFields = () => {
    form.resetFields();
    setDisable(true);
  }

  // checks whether required fields are exists
  const requiredFieldsValidation = (user: IUser): boolean => {
    if (user.userName && user.password && user.email) {
      return false
    }
    return true
  }


  const onValuesChange = (_: any, allValues: any) => {
    setDisable(requiredFieldsValidation(allValues));
  }

  useEffect(() => {
    if (error.message && !error.errors) {
      openNotification("error", error.message, null, error.status)
      clearError()
    }
    else if (error.errors && error.errors.length > 0) {
      const description = error.errors.map(err => err.msg).join("\n")
      openNotification("error", error.message, description, error.status)
      clearError()
    }

    if (currentUser?.userName) {
      openMessage("success", `${currentUser.userName}, you logged in successfully`)
      resetFields()
    }
  }, [currentUser, error])

  return (
    <>
      {/* form */}
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        style={{ marginTop: "40px", maxWidth: "400px" }}
        onValuesChange={onValuesChange}
        onFinish={sendUserData}
      >


        {/* fields of form */}

        <Form.Item
          key="userName"
          name="userName"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            placeholder="Enter your name"
            size="large"
            autoComplete="current-name"
          />
        </Form.Item>
        <Form.Item
          key="email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' },
          { type: "email", message: "Please enter a valid email" }]}

        >
          <Input
            placeholder="Enter your email"
            size="large"
            autoComplete="current-email"
          />
        </Form.Item>

        <Form.Item
          key="password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Enter your password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            size="large"
            autoComplete="current-password"
          />
        </Form.Item>


        {/* submit button */}
        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={disable}
        >

          {
            loading ?
             <><Spin indicator={<LoadingOutlined spin />}/></>:<>Sign In</>
          }
        </Button>
      </Form>
    </>
  )
}

export default SignUp
