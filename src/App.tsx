import React from "react";

import { ConfigProvider } from "antd";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import { EmployeeDirectory } from "./pages/EmployeeDirectory";
import ErrorPage from "./pages/Error";
import { Login } from "./pages/Login";
import RootLayout from "./pages/Root";
import { SprintDashboard } from "./pages/SprintDashboard";
import { TeamDetails } from "./pages/TeamDetails";
import { TeamManager } from "./pages/TeamManager";
import {
  ADMIN_DASHBOARD_LINK,
  AUTH_ROLES,
  DASHBOARD_VIEW_BASIC_LINK,
  DASHBOARD_VIEW_MANAGER_LINK,
  LOGIN_LINK,
  MY_DETAILS_LINK,
  TEAM_DETAILS_MANAGER_LINK,
  TEAM_VIEW_ADMIN_LINK,
  USER_VIEW_ADMIN_LINK,
} from "./utils/consts";
import { LIGHT_THEME } from "./utils/ui";
import { SprintDashboardBasic } from "./pages/SprintDashboardBasic";
import { MyDetails } from "./pages/MyDetails";

function App() {
  return (
    <ConfigProvider theme={LIGHT_THEME}>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Navigate to={LOGIN_LINK} replace />} />
            <Route path={LOGIN_LINK} element={<Login />} />
            <Route
              element={<PrivateRoute allowedAuthRole={AUTH_ROLES.ADMIN} />}
            >
              <Route path={TEAM_VIEW_ADMIN_LINK} element={<TeamManager />} />
              <Route
                path={USER_VIEW_ADMIN_LINK}
                element={<EmployeeDirectory />}
              />
              <Route path={ADMIN_DASHBOARD_LINK} element={<AdminDashboard />} />
            </Route>
            <Route
              element={<PrivateRoute allowedAuthRole={AUTH_ROLES.MANAGER} />}
            >
              <Route
                path={DASHBOARD_VIEW_MANAGER_LINK}
                element={<SprintDashboard />}
              />
              <Route
                path={TEAM_DETAILS_MANAGER_LINK}
                element={<TeamDetails />}
              />
            </Route>
            <Route element={<PrivateRoute allowedAuthRole={AUTH_ROLES.USER} />}>
              <Route
                path={DASHBOARD_VIEW_BASIC_LINK}
                element={<SprintDashboardBasic />}
              />
              <Route path={MY_DETAILS_LINK} element={<MyDetails />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
