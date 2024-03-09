import { Navigate, Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { userStore } from "../stores/UserStore";
import {
  NOT_AUTHENTICATED_LINK,
  UNAUTHORIZED_ACCESS_LINK,
} from "../models/consts";
import React from "react";

const PrivateRoute = observer(
  ({ allowedAuthRole }: { allowedAuthRole: String }) => {
    const location = useLocation();
    const [isAllowed, setIsAllowed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [navigateToRoute, setNavigateToRoute] = useState<string>("");

    useEffect(() => {
      const checkAccess = async () => {
        if (userStore.currentUser) {
          const currentUser = userStore.currentUser;
          if (currentUser.user.authRole === allowedAuthRole) {
            setIsAllowed(true);
          } else {
            setNavigateToRoute(UNAUTHORIZED_ACCESS_LINK);
          }
        } else {
          setNavigateToRoute(NOT_AUTHENTICATED_LINK);
        }
        setLoading(false);
      };

      checkAccess();
    }, [userStore.currentUser, location]);

    return loading ? (
      <Spin />
    ) : isAllowed ? (
      <Outlet />
    ) : (
      <Navigate to={navigateToRoute} replace />
    );
  },
);

export default PrivateRoute;
