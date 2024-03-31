import { Card } from "antd";
import { observer } from "mobx-react";
import { STYLESHEET_LIGHT } from "../../models/consts";
import { Sprint } from "../../stores/SprintStore";
import { TaskCard } from "./TaskCard";
import React from "react";

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
        {selectedSprint?.tasks
          .filter((task) => String(task.statusId) === status.id)
          .map((task) => {
            return <TaskCard task={task} />;
          })}
      </Card>
    );
  },
);
