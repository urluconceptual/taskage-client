import { Button, Card, Dropdown, List, MenuProps, Progress, Space } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { AddSprintModal } from "../features/sprint/AddSprintModal";
import { Sprint } from "../models/Sprint";
import { sprintStore } from "../stores/SprintStore";
import { userStore } from "../stores/UserStore";
import { formatDate } from "../utils/ui";

export const TeamDetails = observer(() => {
  const [sprintDatasource, setSprintDatasource] = useState<Sprint[]>([]);
  const [userDatasource, setUserDatasource] = useState<
    { title: string; capacity: number }[]
  >([]);
  const [selectedSprintId, setSelectedSprintId] = useState<number>();
  const selectedSprint: Sprint | null = selectedSprintId
    ? sprintStore.sprintsAsDictionary[selectedSprintId]
    : null;
  const [sprintCapacity, setSprintCapacity] = useState<number>(0);

  const sprintDatasourceToDropdownContent = (datasource: Sprint[]) => {
    return datasource.map((sprint) => {
      return {
        key: sprint.id,
        label: `Sprint ${formatDate(sprint.startDate)} - ${formatDate(sprint.endDate)}`,
        onClick: () => setSelectedSprintId(sprint.id),
      };
    });
  };

  const calculateTotalSprintCapacity = (sprint: Sprint) => {
    const date1 = new Date(sprint.startDate).getTime();
    const date2 = new Date(sprint.endDate).getTime();
    return Math.round((date2 - date1) / (1000 * 60 * 60 * 24)) * 8;
  };

  const sprintMenuItems: MenuProps["items"] =
    sprintDatasource !== null
      ? sprintDatasourceToDropdownContent(sprintDatasource)
      : [];

  const sprintMenuProps = {
    items: sprintMenuItems,
  };

  useEffect(() => {
    if (userStore.allUsers.length === 0 || sprintStore.allSprints.length === 0)
      return;
    setSprintDatasource(sprintStore.allSprints.sort((a, b) => b.id - a.id));
    if (selectedSprintId === undefined && sprintStore.allSprints.length > 0)
      setSelectedSprintId(sprintStore.allSprints[0].id);
  }, [sprintStore.allSprints, userStore.allUsers]);

  useEffect(() => {
    if (selectedSprintId === undefined) return;
    setSprintCapacity(
      calculateTotalSprintCapacity(
        sprintStore.sprintsAsDictionary[selectedSprintId]
      )
    );
    const data = Object.entries(userStore.userDictionary).map(
      ([key, user]) => ({
        title: user.userLabel,
        capacity: sprintStore.sprintsAsDictionary[selectedSprintId].tasks
          .filter((task) => task.assigneeId === parseInt(key))
          .map((task) => task.estimation)
          .reduce((acc, curr) => acc + curr, 0),
      })
    );

    setUserDatasource(data);
  }, [selectedSprintId]);

  useEffect(() => {
    let teamId = userStore.currentUser?.user.team.id!;
    sprintStore.getAllForTeam(teamId);
    userStore.getAllForTeam(teamId);
  }, []);

  const renderTitle = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Team Details</h2>
      </div>
    );
  };

  return (
    <div
      style={{
        width: 1200,
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card title={renderTitle()} style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginBottom: 20,
          }}
        >
          <Space>
            <Space.Compact>
              <Dropdown menu={sprintMenuProps}>
                <Button>
                  {`Sprint ${formatDate(selectedSprint?.startDate)} - ${formatDate(selectedSprint?.endDate)}`}
                </Button>
              </Dropdown>
              <AddSprintModal
                lastSprintEndDate={sprintDatasource[0]?.endDate}
              />
            </Space.Compact>
          </Space>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={userDatasource}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={
                  <Progress
                    percent={Math.ceil((item.capacity * 100) / sprintCapacity)}
                  />
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
});
