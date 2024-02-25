import { Card } from "antd";
import React, { useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import { userStore } from "../stores/UserStore";
import { useNavigate } from "react-router";
import { USER_VIEW_ADMIN_LINK } from "../models/consts";
import { observer } from "mobx-react";

export const Login = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.isSignedIn && !userStore.automaticLogInWaiting) {
      userStore.automaticLogIn().then((res) => {
        if (res) {
          navigate(USER_VIEW_ADMIN_LINK);
        }
      });
    }
  }, []);

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
            fontSize: 15,
          }}
        >
          <LoginForm />
          <div>
            <img
              src= {userStore.isSignedIn? "./logout-illustration.svg" : "./welcome-illustration.svg"}
              alt="Login page illustration"
              style={{ width: 300 }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
});
