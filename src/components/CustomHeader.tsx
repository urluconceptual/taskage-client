import React from "react";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { FundProjectionScreenOutlined } from "@ant-design/icons";
import { LOGIN_LINK, STYLESHEET_LIGHT } from "../models/consts";

const CustomHeader = () => {
  return (
    <Header
      className="header"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        style={{
          width: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to={LOGIN_LINK}
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "10px",
            flex: "1",
            color: STYLESHEET_LIGHT.headerColor,
          }}
        >
          <FundProjectionScreenOutlined style={{ fontSize: "23px" }} />
          <h1>taskage</h1>
        </Link>
      </div>
    </Header>
  );
};

export default CustomHeader;
