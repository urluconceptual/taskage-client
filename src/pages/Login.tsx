import { Card } from "antd";
import React from "react";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
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
