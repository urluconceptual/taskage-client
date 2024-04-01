import { observer } from "mobx-react";
import React, { useState } from "react";
import { TaskDrawerButton, TaskDrawerMode } from "../../models/ui";
import { Button, Drawer, Popconfirm } from "antd";
import { EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { AddTaskDrawer } from "./AddTaskDrawer";
import { Task } from "../../stores/TaskStore";

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

    const renderButton = (button: TaskDrawerButton) => {
      switch (button) {
        case TaskDrawerButton.EDIT:
          return <EditOutlined />;
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
      switch (mode) {
        case TaskDrawerMode.ADD:
          return "New Task";
        default:
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
      switch (mode) {
        case TaskDrawerMode.ADD:
          return <AddTaskDrawer closeDrawer={closeDrawer} />;
        default:
          return <div>Edit Task Form</div>;
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
  },
);
