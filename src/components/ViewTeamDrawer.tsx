import { Card, List } from "antd";
import React from "react";
import { Team, userStore } from "../stores/UserStore";
import { observer } from "mobx-react";

export const ViewTeamDrawer = observer(
  ({ team, closeDrawer }: { team: Team; closeDrawer: () => void }) => {
    const teamMembersDatasource = Object.values(
      userStore.userDictionary
    ).filter(
      (user) =>
        user.userData.team &&
        user.userData.team.id === team.id &&
        user.userData.id !== team.teamLeadId
    );

    const teamLeadDatasource = [userStore.userDictionary[team.teamLeadId]];
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
      </>
    );
  }
);
