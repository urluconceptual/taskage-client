import { Button, Card, List } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Team, userStore } from "../../stores/UserStore";
import { observer } from "mobx-react";
import { TeamDrawerMode } from "../../models/ui";

export const ViewTeamDrawer = observer(
  ({
    team,
    closeDrawer,
    setCurrentDrawerMode,
  }: {
    team: Team;
    closeDrawer: () => void;
    setCurrentDrawerMode: Dispatch<SetStateAction<TeamDrawerMode>>;
  }) => {
    const teamMembersDatasource = Object.values(
      userStore.userDictionary,
    ).filter(
      (user) =>
        user.userData.team &&
        user.userData.team.id === team.id &&
        user.userData.id !== team.teamLeadId,
    );
    const teamLeadDatasource = [userStore.userDictionary[team.teamLeadId]];

    useEffect(() => {
      userStore.getAll();
    }, []);

    const handleSwitchToEditing = () => {
      setCurrentDrawerMode(TeamDrawerMode.EDIT);
    };

    return (
      <>
        <List
          dataSource={teamLeadDatasource}
          size="small"
          bordered
          header={<div>Team Lead</div>}
          renderItem={(item) => {
            return (
              <List.Item key={item.userData.id}>
                {" "}
                <List.Item.Meta
                  title={item.userLabel}
                  description={item.userData.jobTitle.name}
                />
              </List.Item>
            );
          }}
        />
        <br />
        {teamMembersDatasource.length === 0 && (
          <Card>
            <p>No team members</p>
          </Card>
        )}
        {teamMembersDatasource.length !== 0 && (
          <List
            dataSource={teamMembersDatasource}
            size="small"
            bordered
            header={<div>Team Members</div>}
            renderItem={(item) => {
              return (
                <List.Item key={item.userData.id}>
                  <List.Item.Meta
                    title={item.userLabel}
                    description={item.userData.jobTitle.name}
                  />
                </List.Item>
              );
            }}
          ></List>
        )}
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
  },
);
