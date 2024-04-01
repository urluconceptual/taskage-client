import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  NOT_AUTHENTICATED_LINK,
  UNAUTHORIZED_ACCESS_LINK,
} from "../utils/consts";
import { userStore } from "../stores/UserStore";

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
  }
);

export default PrivateRoute;
