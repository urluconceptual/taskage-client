import { Button, Card } from "antd";
import { observer } from "mobx-react";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Task } from "../../models/Task";
import { dictionaryStore } from "../../stores/DictionaryStore";
import { sprintStore } from "../../stores/SprintStore";
import { taskTypeStore } from "../../stores/TaskTypeStore";
import { userStore } from "../../stores/UserStore";
import { TaskDrawerMode } from "../../utils/ui";

export const ViewTaskDrawer = observer(
  ({
    task,
    closeDrawer,
    setCurrentDrawerMode,
  }: {
    task: Task;
    closeDrawer: () => void;
    setCurrentDrawerMode: Dispatch<SetStateAction<TaskDrawerMode>>;
  }) => {
    const handleSwitchToEditing = () => {
      setCurrentDrawerMode(TaskDrawerMode.EDIT);
    };

    useEffect(() => {
      taskTypeStore.getAll();
    }, []);

    return (
      <>
        <Card type="inner" size="small" title="Priority">
          {dictionaryStore.priorityDictionary[task.priorityId]}
        </Card>
        <Card
          size="small"
          style={{ marginTop: 16 }}
          type="inner"
          title="Sprint"
        >
          {sprintStore.sprintsAsLabels[task.sprintId]}
        </Card>
        <Card
          size="small"
          style={{ marginTop: 16 }}
          type="inner"
          title="Assignee"
        >
          {userStore.userDictionary[task.assigneeId].userLabel}
        </Card>
        <Card
          size="small"
          style={{ marginTop: 16 }}
          type="inner"
          title="Effort"
        >
          {`${task.effortPoints} points`}
        </Card>
        <Card
          size="small"
          style={{ marginTop: 16 }}
          type="inner"
          title="Progress"
        >
          {`${task.progress}/${task.estimation}h`}
        </Card>
        <Card size="small" style={{ marginTop: 16 }} type="inner" title="Type">
          {`${task.taskType.name.toUpperCase()} Task`}
        </Card>
        <Card
          size="small"
          style={{ marginTop: 16 }}
          type="inner"
          title="Description"
        >
          {task.description}
        </Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          <Button style={{ width: "30%" }} onClick={closeDrawer}>
            Cancel
          </Button>
          <Button
            style={{ width: "68%" }}
            type="primary"
            onClick={handleSwitchToEditing}
          >
            Edit
          </Button>
        </div>
      </>
    );
  }
);
