import { ConfigProvider } from "antd";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import {
  ADMIN_LINK,
  AUTH_ROLES,
  DASHBOARD_VIEW_MANAGER_LINK,
  LOGIN_LINK,
  TEAM_VIEW_ADMIN_LINK,
  USER_VIEW_ADMIN_LINK,
} from "./models/consts";
import { LIGHT_THEME } from "./models/ui";
import { AdminDashboard } from "./pages/AdminDashboard";
import { EmployeeDirectory } from "./pages/EmployeeDirectory";
import ErrorPage from "./pages/Error";
import { Login } from "./pages/Login";
import { ManagerDashboard } from "./pages/ManagerDashboard";
import RootLayout from "./pages/Root";
import { TeamManager } from "./pages/TeamManager";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <ConfigProvider theme={LIGHT_THEME}>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Navigate to={LOGIN_LINK} replace />} />
            <Route path={LOGIN_LINK} element={<Login />} />
            <Route path={ADMIN_LINK} element={<AdminDashboard />} />
            <Route
              element={<PrivateRoute allowedAuthRole={AUTH_ROLES.ADMIN} />}
            >
              <Route path={TEAM_VIEW_ADMIN_LINK} element={<TeamManager />} />
              <Route
                path={USER_VIEW_ADMIN_LINK}
                element={<EmployeeDirectory />}
              />
            </Route>
            <Route
              element={<PrivateRoute allowedAuthRole={AUTH_ROLES.MANAGER} />}
            >
              <Route
                path={DASHBOARD_VIEW_MANAGER_LINK}
                element={<ManagerDashboard />}
              />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
