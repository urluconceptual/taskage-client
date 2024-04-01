import { observer } from "mobx-react";
import React from "react";
import { Task } from "../../stores/TaskStore";

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
  }
);
