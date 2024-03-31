import { Button, Card, List } from "antd";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Task } from "../../stores/SprintStore";

export const ViewTaskDrawer = observer(
  ({ task, closeDrawer }: { task: Task; closeDrawer: () => void }) => {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        ></div>
      </>
    );
  },
);
