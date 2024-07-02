import { Card, List, MenuProps, Progress } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Sprint } from "../models/Sprint";
import { sprintStore } from "../stores/SprintStore";
import { userStore } from "../stores/UserStore";
import Chart from "react-google-charts";
import Title from "antd/es/typography/Title";

export const MyDetails = observer(() => {
  const data = [
    ["Sprint", "Effort Points"],
    ...sprintStore.sprintDataForCurrentUser.map((sprint) => [
      `${sprint.sprintStartDate} - ${sprint.sprintEndDate}`,
      sprint.effortPoints,
    ]),
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

  const [userDatasource, setUserDatasource] = useState<
    { title: string; capacity: number }[]
  >([]);
  const [selectedSprintId, setSelectedSprintId] = useState<number>();
  const [sprintCapacity, setSprintCapacity] = useState<number>(0);

  const calculateTotalSprintCapacity = (sprint: Sprint) => {
    const date1 = new Date(sprint.startDate).getTime();
    const date2 = new Date(sprint.endDate).getTime();
    return Math.round((date2 - date1) / (1000 * 60 * 60 * 24)) * 8;
  };

  useEffect(() => {
    if (userStore.allUsers.length === 0 || sprintStore.allSprints.length === 0)
      return;
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

    const data = Object.entries(userStore.userDictionary)
      .filter(
        ([key, item]: any) =>
          item.userData?.username == userStore.currentUser?.user.username
      )
      .map(([key, user]) => ({
        title: user?.userLabel,
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
