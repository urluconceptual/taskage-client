import { Card } from "antd";
import React from "react";
import { LoginForm } from "../components/LoginForm";
import { userStore } from "../stores/UserStore";
import { observer } from "mobx-react";

export const Login = observer(() => {
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
              src={
                userStore.isSignedIn
                  ? "./logout-illustration.svg"
                  : "./welcome-illustration.svg"
              }
              alt="Login page illustration"
              style={{ width: 300 }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
});
