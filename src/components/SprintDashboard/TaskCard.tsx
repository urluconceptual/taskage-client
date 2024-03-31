import { Card, Tag } from "antd";
import { observer } from "mobx-react";
import { STYLESHEET_LIGHT } from "../../models/consts";
import { Task } from "../../stores/SprintStore";
import { dictionaryStore } from "../../stores/DictionaryStore";
import { userStore } from "../../stores/UserStore";
import React from "react";

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
        <span>{task.title}</span>
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
