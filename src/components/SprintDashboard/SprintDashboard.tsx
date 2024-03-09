import React, { useEffect, useState } from "react";
import { Sprint, sprintStore } from "../../stores/SprintStore";
import { userStore } from "../../stores/UserStore";
import { Button, Card, Dropdown, MenuProps, Space } from "antd";
import { observer } from "mobx-react";

export const SprintDashboard = observer(() => {
  const [datasource, setDatasource] = useState<Sprint[]>([]);
  const [selectedSprint, setSelectedSprint] = useState<Sprint>();

  useEffect(() => {
    console.log(sprintStore.allSprints);
    setDatasource(sprintStore.allSprints.sort((a, b) => b.id - a.id));
    setSelectedSprint(sprintStore.allSprints[0]);
  }, [sprintStore.allSprints]);

  useEffect(() => {
    var teamId = userStore.currentUser?.user.team.id!;
    sprintStore.getAllForTeam(teamId);
  }, []);

  const formatDate = (date: string | undefined) => {
    return date ? new Date(date).toLocaleDateString() : "";
  };

  const menuItems: MenuProps["items"] =
    datasource !== null
      ? datasource.map((sprint) => {
          return {
            key: sprint.id,
            label: `Sprint ${formatDate(sprint.startDate)} - ${formatDate(sprint.endDate)}`,
            onClick: () => setSelectedSprint(sprint),
          };
        })
      : [];

  const menuProps = {
    items: menuItems,
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginBottom: 20,
        }}
      >
        <Space>
          <Space.Compact>
            <Dropdown.Button menu={menuProps}>
              {`Sprint ${formatDate(selectedSprint?.startDate)} - ${formatDate(selectedSprint?.endDate)}`}
            </Dropdown.Button>
          </Space.Compact>
        </Space>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Card title="To Do" style={{ width: "30%" }}>
          <Card.Grid style={{ width: "100%" }} hoverable={true}>
            Content
          </Card.Grid>
        </Card>
        <Card title="In Progress" style={{ width: "30%" }}>
          <Card.Grid style={{ width: "100%" }}>Content</Card.Grid>
        </Card>
        <Card title="Done" style={{ width: "30%" }}>
          <Card.Grid style={{ width: "100%" }}>Content</Card.Grid>
        </Card>
      </div>
    </>
  );
});
