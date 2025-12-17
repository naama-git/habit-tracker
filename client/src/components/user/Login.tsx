
/*----------------------------------------------------------------------------
 🧩 Component : Login
 📃 Description : Login form component
------------------------------------------------------------------------------*/

import { Form, Input, Button, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { IUser } from "../../types/IUser";
import { useUserStore } from "../../store/UserStore";
import { useMessageContext } from "../../context/MessageContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { useShallow } from 'zustand/shallow'

const Login: React.FC = () => {


  const [form] = Form.useForm();

  //------ Types ------
  type loginIUser = Pick<IUser, 'userName' | 'password'>;

  const { login, clearError } = useUserStore()
  const { error, loading, currentUser } = useUserStore(
    useShallow(
      (state) => ({
        error: state.error,
        loading: state.loading,
        currentUser: state.currentUser
      })
    )
  )


  const { openNotification } = useNotificationContext()
  const [disable, setDisable] = useState<boolean>(true)
  const { openMessage } = useMessageContext()


  const sendUserData = async (user: loginIUser | null) => {

    if (!user) return
    await login(user)
    resetFields()
    if (currentUser?.userName && currentUser.userName !== undefined) {
      openMessage("success", `${currentUser?.userName}, you logged in successfully`)
    }

  }

  const resetFields = () => {
    form.resetFields();
    setDisable(true);
  }

  // checks whether required fields are exists
  const requiredFieldsValidation = (user: loginIUser): boolean => {
    if (user.userName && user.password) {
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
  }, [currentUser, error])


  return (
    <>

      {/* form */}

      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: "40px", maxWidth: "400px" }}
        onFinish={sendUserData}
        onValuesChange={onValuesChange}
      >

        <Form.Item
          key="userName"
          name="userName"
          rules={[{ required: true, message: 'Please input your user name!' }]}
        >
          <Input placeholder="Enter your name" size="large" autoComplete="current-name" />
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={disable}


          >
            {
              loading ?
                <><Spin indicator={<LoadingOutlined spin />} /></> : <>Log In</>
            }

          </Button>
        </Form.Item>

      </Form>
    </>
  )
}

export default Login
