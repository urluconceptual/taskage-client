import { Button, Drawer, Form } from "antd";
import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Team } from "../stores/UserStore";
import {
  TeamDrawerButton,
  TeamDrawerMode
} from "../stores/TeamStore";
import { AddTeamDrawer } from "./AddTeamDrawer";
import { ViewTeamDrawer } from "./ViewTeamDrawer";

export const TeamDrawer = observer(
  ({
    team,
    button,
    mode,
  }: {
    team: Team | null;
    button: TeamDrawerButton;
    mode: TeamDrawerMode;
  }) => {
    const [form] = Form.useForm();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const renderButton = (button: TeamDrawerButton) => {
      switch (button) {
        case TeamDrawerButton.VIEW:
          return <EyeOutlined />;
        case TeamDrawerButton.ADD:
          return (
            <Button onClick={() => setDrawerIsOpen(true)} type="primary">
              Add Team
            </Button>
          );
      }
    };

    const closeDrawer = () => {
      setDrawerIsOpen(false);
    };

    const renderContent = () => {
      switch (mode) {
        case TeamDrawerMode.ADD:
          return <AddTeamDrawer closeDrawer={closeDrawer} />
        case TeamDrawerMode.VIEW:
          return <ViewTeamDrawer team={team!} closeDrawer={closeDrawer} />
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
          title={mode === TeamDrawerMode.ADD ? "New Team" : team!.name}
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
