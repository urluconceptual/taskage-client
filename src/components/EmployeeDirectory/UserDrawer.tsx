import React from "react";
import { observer } from "mobx-react";
import {
  User,
  UserDrawerButton,
  UserDrawerMode,
  userStore,
} from "../../stores/UserStore";
import { EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button, Drawer, Popconfirm } from "antd";
import { AddUserDrawer } from "./AddUserDrawer";
import { EditUserDrawer } from "./EditUserDrawer";

export const UserDrawer = observer(
  ({
    user,
    button,
    mode,
  }: {
    user: User | null;
    button: UserDrawerButton;
    mode: UserDrawerMode;
  }) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [currentDrawerMode, setCurrentDrawerMode] = useState(mode);

    const renderButton = (button: UserDrawerButton) => {
      switch (button) {
        case UserDrawerButton.EDIT:
          return <EditOutlined />;
        case UserDrawerButton.ADD:
          return (
            <Button onClick={() => setDrawerIsOpen(true)} type="primary">
              Add Employee
            </Button>
          );
      }
    };

    const closeDrawer = () => {
      setDrawerIsOpen(false);
    };

    const handleConfirmDelete = () => {
      userStore.deleteUser(user!.id);
      closeDrawer();
    };

    const renderTitle = () => {
      switch (currentDrawerMode) {
        case UserDrawerMode.ADD:
          return "New User";
        default:
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {`${user?.firstName} ${user?.lastName} (${user!.username})`}
              <Popconfirm
                title="Delete the user"
                description="Are you sure you want to delete this user? This action is irreversible."
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={handleConfirmDelete}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </div>
          );
      }
    };

    const renderContent = () => {
      switch (currentDrawerMode) {
        case UserDrawerMode.ADD:
          return <AddUserDrawer closeDrawer={closeDrawer} />;
        case UserDrawerMode.EDIT:
          return <EditUserDrawer user={user!} closeDrawer={closeDrawer} />;
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
