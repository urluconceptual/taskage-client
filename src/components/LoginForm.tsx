import { Button, Divider, Form, Input } from "antd";
import React from "react";
import {
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { LogInRequestObj, userStore } from "../stores/UserStore";
import { observer } from "mobx-react";
import { useNavigate } from "react-router";
import { USER_VIEW_ADMIN_LINK } from "../models/consts";

export const LoginForm = observer(() => {
  const navigate = useNavigate();

  const handleFinishForm = async (logInRequestObj: LogInRequestObj) => {
    await userStore.logIn(logInRequestObj);
    if (userStore.isSignedIn) {
      navigate(USER_VIEW_ADMIN_LINK);
    }
  };

  const handleRedirectClick = () => {
    navigate(USER_VIEW_ADMIN_LINK);
  };

  const handleLogoutClick = () => {
    userStore.logOut();
  };

  const renderLoginForm = () => {
    return (
      <>
        <p>
          <UserOutlined style={{ fontSize: 40 }} />
        </p>
        <h3 style={{ margin: 0 }}>Welcome back!</h3>
        <p>Please enter your credentials to log in.</p>
        <Form
          name="loginForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={handleFinishForm}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item<LogInRequestObj>
            name="username"
            rules={[{ required: true, message: "Missing username." }]}
          >
            <Input style={{ width: 300 }} placeholder="Username" />
          </Form.Item>
          <Form.Item<LogInRequestObj>
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
      </>
    );
  };

  const renderLogoutForm = () => {
    return (
      <>
        <p>
          <UserOutlined style={{ fontSize: 40 }} />
        </p>
        <h3 style={{ margin: 0 }}>You're already logged in.</h3>
        <p style={{ textAlign: "center" }}>
          Log out first to access as a different user.
        </p>
        <Button
          type="primary"
          onClick={handleRedirectClick}
          style={{ width: 300 }}
        >
          Go to dashboard
        </Button>{" "}
        <br />
        <Button onClick={handleLogoutClick} style={{ width: 300 }}>
          Log out
        </Button>
      </>
    );
  };

  return (
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
      {userStore.isSignedIn ? renderLogoutForm() : renderLoginForm()}
    </div>
  );
});
