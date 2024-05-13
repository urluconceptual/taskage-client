import {
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Popconfirm } from "antd";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Task } from "../../models/Task";
import { TaskDrawerButton, TaskDrawerMode } from "../../utils/ui";
import { AddTaskDrawer } from "./AddTaskDrawer";
import { EditTaskDrawer } from "./EditTaskDrawer";
import { ViewTaskDrawer } from "./ViewTaskDrawer";

export const TaskDrawer = observer(
  ({
    task,
    button,
    mode,
  }: {
    task: Task | null;
    button: TaskDrawerButton;
    mode: TaskDrawerMode;
  }) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [currentDrawerMode, setCurrentDrawerMode] = useState(mode);

    const renderButton = (button: TaskDrawerButton) => {
      switch (button) {
        case TaskDrawerButton.EDIT:
          return <EditOutlined />;
        case TaskDrawerButton.VIEW:
          return <EyeOutlined />;
        case TaskDrawerButton.ADD:
          return (
            <Button onClick={() => setDrawerIsOpen(true)} type="primary">
              Add Task
            </Button>
          );
      }
    };

    const closeDrawer = () => {
      setDrawerIsOpen(false);
    };

    const renderTitle = () => {
      switch (currentDrawerMode) {
        case TaskDrawerMode.ADD:
          return "New Task";
        case TaskDrawerMode.VIEW:
          return task?.title;
        case TaskDrawerMode.EDIT:
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {task?.title}
              <Popconfirm
                title="Delete this task"
                description="Are you sure you want to delete this task? This action is irreversible."
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </div>
          );
      }
    };

    const renderContent = () => {
      switch (currentDrawerMode) {
        case TaskDrawerMode.ADD:
          return <AddTaskDrawer closeDrawer={closeDrawer} />;
        case TaskDrawerMode.VIEW:
          return (
            <ViewTaskDrawer
              task={task!}
              closeDrawer={closeDrawer}
              setCurrentDrawerMode={setCurrentDrawerMode}
            />
          );
        case TaskDrawerMode.EDIT:
          return (
            <EditTaskDrawer
              task={task!}
              closeDrawer={closeDrawer}
              setCurrentDrawerMode={setCurrentDrawerMode}
            />
          );
      }
    };

    return (
      <>
        <span
          onClick={() => setDrawerIsOpen(true)}
          style={{ cursor: "pointer" }}
        >
          {renderButton(button)}
        </span>
        <Drawer
          title={renderTitle()}
          open={drawerIsOpen}
          closable={false}
          width={"35%"}
          onClose={() => closeDrawer()}
          placement="right"
        >
          {renderContent()}
        </Drawer>
      </>
    );
  }
);
