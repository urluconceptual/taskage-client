import { Button, Card, Form, Input } from "antd";
import React from "react";
import {
  IdcardOutlined,
  UserOutlined,
  KeyOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

export interface UserObj {
  username?: string;
  password?: string;
}

export const Login = () => {
  const renderLoginForm = () => {
    return (
      <Form
        name="loginForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item<UserObj>
          name="username"
          rules={[
            { required: true, message: "Please input your email." },
            { type: "email", message: "Please provide a valid email address." },
          ]}
        >
          <Input
            style={{ width: 300 }}
            placeholder="Username"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item<UserObj>
          name="password"
          rules={[{ required: true, message: "Please input your password." }]}
        >
          <Input.Password
            style={{ width: 300 }}
            placeholder="Password"
            prefix={<KeyOutlined />}
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ width: 300 }} htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div
      style={{
        width: "1200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          width: 400,
          height: 450,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 400,
            height: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IdcardOutlined style={{ fontSize: 40 }} />
          <h2>Welcome Back!</h2>
          <p>Please enter yout credentials to log in.</p>
          {renderLoginForm()}
        </div>
      </Card>
    </div>
  );
};
