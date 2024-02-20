import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Team } from "../stores/UserStore";
import { TeamDrawerButton, TeamDrawerMode } from "../stores/TeamStore";

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
          width={"40%"}
          onClose={() => setDrawerIsOpen(false)}
          placement="right"
        >
          Text
        </Drawer>
      </>
    );
  },
);
