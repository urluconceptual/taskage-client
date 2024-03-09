import { Button, Result } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  LOGIN_LINK,
  NOT_AUTHENTICATED_LINK,
  UNAUTHORIZED_ACCESS_LINK,
} from "../models/consts";
import React from "react";

const ErrorPage = () => {
  const location = useLocation();
  console.log("location.pathname", location.pathname);

  switch (location.pathname) {
    case UNAUTHORIZED_ACCESS_LINK:
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Result
            status="warning"
            title="You are not authorized to access this page."
            extra={
              <Button>
                <Link to={LOGIN_LINK}>Back Home</Link>
              </Button>
            }
          />
        </div>
      );
    case NOT_AUTHENTICATED_LINK:
      console.log("location.pathname", location.pathname);

      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Result
            status="403"
            title="You are not authenticated."
            extra={
              <Button>
                <Link to={LOGIN_LINK}>Go to Login page</Link>
              </Button>
            }
          />
        </div>
      );
    default:
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button>
                <Link to={LOGIN_LINK}>Back Home</Link>
              </Button>
            }
          />
        </div>
      );
  }
};

export default ErrorPage;
