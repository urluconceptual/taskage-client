import { Card } from "antd";
import React, { useEffect } from "react";
import { teamStore } from "../stores/TeamStore";
import { userStore } from "../stores/UserStore";
import { SprintDashboard } from "../components/SprintDashboard/SprintDashboard";

export const ManagerDashboard = () => {
  useEffect(() => {
    console.log(userStore.currentUser);
  });

  const renderTitle = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Sprint Dashboard</h2>
      </div>
    );
  };

  return (
    <div
      style={{
        width: 1200,
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card title={renderTitle()} style={{ width: "100%" }}>
        <SprintDashboard />
      </Card>
    </div>
  );
};
