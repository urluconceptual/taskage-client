import React from "react";
import { Card, Tag } from "antd";
import { observer } from "mobx-react";
import { Task } from "../../models/Task";
import { dictionaryStore } from "../../stores/DictionaryStore";
import { userStore } from "../../stores/UserStore";
import { STYLESHEET_LIGHT } from "../../utils/consts";
import { TaskDrawerButton, TaskDrawerMode } from "../../utils/ui";
import { TaskDrawer } from "../task-drawer/TaskDrawer";

export const TaskCard = observer(({ task }: { task: Task }) => {
  return (
    <Card.Grid
      style={{
        backgroundColor: STYLESHEET_LIGHT.backgroundColor,
        width: "100%",
      }}
      hoverable={true}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <span>
          {" "}
          <TaskDrawer
            task={task}
            button={TaskDrawerButton.VIEW}
            mode={TaskDrawerMode.VIEW}
          />{" "}
          {task.title}
        </span>
        <span>{`${task.progress}/${task.estimation}h`}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Tag style={{ margin: 0 }} color="blue">
          {dictionaryStore.priorityDictionary[task.priorityId]}
        </Tag>
        <Tag style={{ margin: 0 }} color="green">
          {userStore.userDictionary[task.assigneeId].userLabel}
        </Tag>
      </div>
    </Card.Grid>
  );
});
