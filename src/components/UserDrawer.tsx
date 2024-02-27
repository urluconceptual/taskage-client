import { observer } from "mobx-react";
import { User, UserDrawerButton, UserDrawerMode } from "../stores/UserStore";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button, Drawer } from "antd";

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
        case UserDrawerButton.VIEW:
          return <EyeOutlined />;
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

    const renderTitle = () => {
      switch (currentDrawerMode) {
        case UserDrawerMode.ADD:
          return "New Team";
        default:
          return user!.username;
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
        ></Drawer>
      </>
    );
  }
);
