import React from "react";
import { Header } from "antd/es/layout/layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FundProjectionScreenOutlined } from "@ant-design/icons";
import {
  AUTH_ROLES,
  LOGIN_LINK,
  STYLESHEET_LIGHT,
  TEAM_VIEW_ADMIN_LINK,
  USER_VIEW_ADMIN_LINK,
} from "../models/consts";
import { Button, Menu } from "antd";
import { userStore } from "../stores/UserStore";

const CustomHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    userStore.logOut();
    navigate(LOGIN_LINK);
  };

  const renderMenu = () => {
    if (userStore.currentUser?.authRole === AUTH_ROLES.ADMIN) {
      return (
        <>
          <Menu
            mode="horizontal"
            style={{ justifyContent: "flex-end", flex: 6 }}
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key={USER_VIEW_ADMIN_LINK}>
              <Link to={`${USER_VIEW_ADMIN_LINK}`}>Employee Directory</Link>
            </Menu.Item>
            <Menu.Item key={TEAM_VIEW_ADMIN_LINK}>
              <Link to={TEAM_VIEW_ADMIN_LINK}>Team Manager</Link>
            </Menu.Item>
          </Menu>
          <Button onClick={handleLogOutClick}>Log Out</Button>
        </>
      );
    }
  };

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
          columnGap: "10px",
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
        {renderMenu()}
      </div>
    </Header>
  );
};

export default CustomHeader;
