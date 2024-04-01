import { Card } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { Sprint } from "../../models/Sprint";
import { STYLESHEET_LIGHT } from "../../utils/consts";
import { TaskCard } from "./TaskCard";

interface Status {
  id: string;
  name: string;
}

export const TaskSection = observer(
  ({
    status,
    numberOfColumns,
    selectedSprint,
  }: {
    status: Status;
    numberOfColumns: number;
    selectedSprint: Sprint;
  }) => {
    return (
      <Card
        title={String(status.name)}
        style={{
          backgroundColor: STYLESHEET_LIGHT.colorSecondaryTransparent,
          width: `${100 / numberOfColumns - 1}%`,
        }}
        bodyStyle={{ padding: 10 }}
      >
        {selectedSprint?.tasks.filter(
          (task) => String(task.statusId) === status.id
        ).length > 0 ? (
          selectedSprint?.tasks
            .filter((task) => String(task.statusId) === status.id)
            .map((task) => {
              return <TaskCard task={task} />;
            })
        ) : (
          <div style={{ textAlign: "center" }}>No tasks</div>
        )}
      </Card>
    );
  }
);
