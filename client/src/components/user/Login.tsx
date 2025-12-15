
/*----------------------------------------------------------------------------
 🧩 Component : Login
 📃 Description : Login form component
------------------------------------------------------------------------------*/

import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";
import type { IUser } from "../../types/IUser";
import { useUserStore } from "../../store/UserStore";
import { useMessageContext } from "../../context/MessageContext";

const Login: React.FC = () => {


  const [form] = Form.useForm();

  //------ Types ------
  type loginIUser = Pick<IUser, 'userName' | 'password'>;

  const { login } = useUserStore()


  const [disable, setDisable] = useState<boolean>(true)
  const { openMessage } = useMessageContext()

  const sendUserData = (user: loginIUser | null) => {

    if (!user) return;

    try {
      login(user)
      openMessage("success", user.userName + ", you logged in successfully")
      resetFields();
    } catch (err) {
      console.log(err);

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
            Log In
          </Button>
        </Form.Item>

      </Form>
    </>
  )
}

export default Login
