import React from "react";
import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";

const RootLayout = () => {
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
};

export default RootLayout;
