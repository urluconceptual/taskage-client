import { EyeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Drawer, Popconfirm } from "antd";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Team } from "../../models/Team";
import { teamStore } from "../../stores/TeamStore";
import { TeamDrawerButton, TeamDrawerMode } from "../../utils/ui";
import { AddTeamDrawer } from "./AddTeamDrawer";
import { EditTeamDrawer } from "./EditTeamDrawer";
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
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [currentDrawerMode, setCurrentDrawerMode] = useState(mode);

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
      switch (currentDrawerMode) {
        case TeamDrawerMode.ADD:
          return <AddTeamDrawer closeDrawer={closeDrawer} />;
        case TeamDrawerMode.VIEW:
          return (
            <ViewTeamDrawer
              team={team!}
              closeDrawer={closeDrawer}
              setCurrentDrawerMode={setCurrentDrawerMode}
            />
          );
        case TeamDrawerMode.EDIT:
          return (
            <EditTeamDrawer
              closeDrawer={closeDrawer}
              team={team!}
              setCurrentDrawerMode={setCurrentDrawerMode}
            />
          );
      }
    };

    const handleConfirmDelete = () => {
      teamStore.deleteTeam(team!.id);
      closeDrawer();
    };

    const renderTitle = () => {
      switch (currentDrawerMode) {
        case TeamDrawerMode.ADD:
          return "New Team";
        case TeamDrawerMode.VIEW:
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {team!.name}
              <Popconfirm
                title="Delete the team"
                description="Are you sure you want to delete this team? This action is irreversible."
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={handleConfirmDelete}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </div>
          );
        case TeamDrawerMode.EDIT:
          return team!.name;
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
