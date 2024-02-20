import { ConfigProvider } from "antd";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ADMIN_LINK, LOGIN_LINK, STYLESHEET_LIGHT, TEAM_VIEW_ADMIN_LINK, USER_VIEW_ADMIN_LINK } from "./models/consts";
import RootLayout from "./pages/Root";
import { Login } from "./pages/Login";
import "./App.css";
import { AdminDashboard } from "./pages/AdminDashboard";
import { EmployeeDirectory } from "./pages/EmployeeDirectory";
import { TeamManager } from "./pages/TeamManager";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: STYLESHEET_LIGHT.headerBg,
            fontFamily: STYLESHEET_LIGHT.logoFontFamily,
          },
          Menu: {
            colorBgContainer: STYLESHEET_LIGHT.headerBg,
            colorText: STYLESHEET_LIGHT.headerTextColor,
            horizontalItemHoverColor: STYLESHEET_LIGHT.headerTextColor,
            horizontalItemSelectedColor: STYLESHEET_LIGHT.headerTextColor,
          },
          Table: {
            borderColor: STYLESHEET_LIGHT.colorTextTransparent,
            headerSplitColor: STYLESHEET_LIGHT.colorTextTransparent,
            headerBg: STYLESHEET_LIGHT.colorSecondaryTransparent,
          },
          Input: {
            colorBorder: STYLESHEET_LIGHT.colorTextTransparent,
            hoverBorderColor: STYLESHEET_LIGHT.colorText,
            activeBorderColor: STYLESHEET_LIGHT.colorText
          },
        },
        token: {
          colorPrimary: STYLESHEET_LIGHT.colorPrimary,
          colorError: STYLESHEET_LIGHT.colorErrorText,
          fontFamily: STYLESHEET_LIGHT.fontFamily,
          colorText: STYLESHEET_LIGHT.colorText,
          colorBgBase: STYLESHEET_LIGHT.backgroundColor,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Navigate to={LOGIN_LINK} replace />} />
            <Route path={LOGIN_LINK} element={<Login />} />
            <Route path={ADMIN_LINK} element={<AdminDashboard />} />
            <Route path={TEAM_VIEW_ADMIN_LINK} element={<TeamManager />} />
            <Route path={USER_VIEW_ADMIN_LINK} element={<EmployeeDirectory />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
