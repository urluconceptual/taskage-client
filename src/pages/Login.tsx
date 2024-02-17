import { Button, Card, Divider, Form, Input } from "antd";
import React from "react";
import {
  UserOutlined,
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
          rules={[{ required: true, message: "Missing username." }]}
        >
          <Input style={{ width: 300 }} placeholder="Username" />
        </Form.Item>
        <Form.Item<UserObj>
          name="password"
          rules={[{ required: true, message: "Missing password." }]}
        >
          <Input.Password
            style={{ width: 300 }}
            placeholder="Password"
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
          width: 900,
          height: 500,
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 900,
            height: 500,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            fontSize: 16,
          }}
        >
          <div
            style={{
              width: 300,
              height: 500,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <UserOutlined style={{ fontSize: 40 }} />
            </p>
            <h3 style={{ margin: 0 }}>Welcome back!</h3>
            <p>Please enter yout credentials to log in.</p>
            {renderLoginForm()}
            <Divider
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
            />
            <p
              style={{
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Don't have an account? <br />
              Ask your admin to create one.
            </p>
          </div>
          <div>
            <img
              src="./welcome-illustration.svg"
              alt="Welcome illustration"
              style={{ width: 300 }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
