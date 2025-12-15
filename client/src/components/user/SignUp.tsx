
/*----------------------------------------------------------------------------
 🧩 Component : SignUp
 📃 Description : Sign up form component
------------------------------------------------------------------------------*/

import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";
import type { IUser } from "../../types/IUser";
import { useUserStore } from "../../store/UserStore";
import { useMessageContext } from "../../context/MessageContext";


const SignUp: React.FC = () => {

  const [form] = Form.useForm();
  const { signUp } = useUserStore();
  const [disable, setDisable] = useState<boolean>(true)
  const { openMessage } = useMessageContext()

  const sendUserData = async (user: IUser | null) => {
    if (!user) return;

    try {
      signUp(user)
      openMessage("success", user.userName + ", you signed in successfully!")
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
  const requiredFieldsValidation = (user: IUser): boolean => {
    if (user.userName && user.password && user.email) {
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

          Sign in
        </Button>
      </Form>
    </>
  )
}

export default SignUp
