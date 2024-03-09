import React, { useEffect } from "react";
import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";
import { observer } from "mobx-react";
import { userStore } from "../stores/UserStore";
import { REDIRECT_AFTER_LOGIN } from "../models/consts";

const RootLayout = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.isSignedIn && !userStore.automaticLogInWaiting) {
      userStore.automaticLogIn().then((res) => {
        if (res) {
          navigateToDefault(userStore.currentUser!.user.authRole!);
        }
      });
    }
  }, []);

  const navigateToDefault = (authRole: string) => {
    switch (authRole) {
      case "ROLE_ADMIN":
        navigate(REDIRECT_AFTER_LOGIN["ROLE_ADMIN"]);
        break;
      case "ROLE_MANAGER":
        navigate(REDIRECT_AFTER_LOGIN["ROLE_MANAGER"]);
    }
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <CustomHeader />
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>taskage ©2024</Footer>
      </Layout>
    </>
  );
});

export default RootLayout;
