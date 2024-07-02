import { Card, List, MenuProps, Progress } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Sprint } from "../models/Sprint";
import { sprintStore } from "../stores/SprintStore";
import { userStore } from "../stores/UserStore";
import { formatDate } from "../utils/ui";
import Chart from "react-google-charts";
import Title from "antd/es/typography/Title";

const sprintData = [
  {
    sprintNumber: "Sprint 20/04/2024 - 30/04/2024",
    effortPoints: 5,
  },
  {
    sprintNumber: "Sprint 06/04/2024 - 20/04/2024",
    effortPoints: 13,
  },
  {
    sprintNumber: "Sprint 25/03/2024 - 05/04/2024",
    effortPoints: 16,
  },
  {
    sprintNumber: "Sprint 10/03/2024 - 24/03/2024",
    effortPoints: 12,
  },
  {
    sprintNumber: "Sprint 24/02/2024 - 09/03/2024",
    effortPoints: 22,
  },
];

const data = [
  ["Sprint", "Effort Points"],
  ...sprintData.map((sprint) => [sprint.sprintNumber, sprint.effortPoints]),
];

const options = {
  title: "Effort Points per Sprint",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Effort Points",
    minValue: 0,
  },
  vAxis: {
    title: "Sprint",
  },
  bars: "horizontal",
};

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
    console.log(userStore.userDictionary);
    const data = Object.entries(userStore.userDictionary)
      .filter(([key, item]: any) => item.userData?.username == "bjohnson")
      .map(([key, user]) => ({
        title: user.userLabel,
        capacity: sprintStore.sprintsAsDictionary[selectedSprintId].tasks
          .filter((task) => task.assigneeId === parseInt(key))
          .map((task) => task.estimation)
          .reduce((acc, curr) => acc + curr, 0),
      }));

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
        <h2>My Details</h2>
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
          {/* <Space>
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
          </Space> */}
        </div>
        <Title level={4}>Current Sprint</Title>
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
        <Title level={4}>Last Sprints</Title>
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </Card>
    </div>
  );
});
