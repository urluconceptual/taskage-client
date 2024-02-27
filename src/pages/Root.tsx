import React, { useEffect } from "react";
import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";
import { observer } from "mobx-react";
import { userStore } from "../stores/UserStore";
import { USER_VIEW_ADMIN_LINK } from "../models/consts";

const RootLayout = observer(() => {
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
