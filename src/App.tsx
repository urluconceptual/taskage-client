import { ConfigProvider } from "antd";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ADMIN_LINK, LOGIN_LINK, STYLESHEET_LIGHT } from "./models/consts";
import RootLayout from "./pages/Root";
import { Login } from "./pages/Login";
import "./App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: STYLESHEET_LIGHT.headerBg,
            fontFamily: STYLESHEET_LIGHT.logoFontFamily,
          },
        },
        token: {
          colorPrimary: STYLESHEET_LIGHT.colorPrimary,
          colorError: STYLESHEET_LIGHT.colorErrorText,
          fontFamily: STYLESHEET_LIGHT.fontFamily,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Navigate to={LOGIN_LINK} replace />} />
            <Route path={LOGIN_LINK} element={<Login />} />
            <Route path={ADMIN_LINK} element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
