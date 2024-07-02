import React from "react";

import { Button, Card, Dropdown, MenuProps, Space } from "antd";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { AddSprintModal } from "../features/sprint/AddSprintModal";
import { TaskBoard } from "../features/task-board/TaskBoard";
import { TaskDrawer } from "../features/task-drawer/TaskDrawer";
import { Sprint } from "../models/Sprint";
import { dictionaryStore } from "../stores/DictionaryStore";
import { sprintStore } from "../stores/SprintStore";
import { userStore } from "../stores/UserStore";
import { TaskDrawerButton, TaskDrawerMode, formatDate } from "../utils/ui";

export const SprintDashboardBasic = observer(() => {
  const [datasource, setDatasource] = useState<Sprint[]>([]);
  const [selectedSprintId, setSelectedSprintId] = useState<number>();
  const selectedSprint: Sprint | null = selectedSprintId
    ? sprintStore.sprintsAsDictionary[selectedSprintId]
    : null;

  useEffect(() => {
    setDatasource(
      sprintStore.allSprints
        .sort((a, b) => b.id - a.id)
        .map((sprint) => {
          sprint.tasks = sprint.tasks.filter(
            (task) => task.assigneeId === userStore.currentUser?.user.id
          );
          return sprint;
        })
    );
    if (selectedSprintId === undefined && sprintStore.allSprints.length > 0)
      setSelectedSprintId(sprintStore.allSprints[0].id);
  }, [sprintStore.allSprints]);

  useEffect(() => {
    let teamId = userStore.currentUser?.user.team.id!;
    sprintStore.getAllForTeam(teamId);
    userStore.getAllForTeam(teamId);
    dictionaryStore.getPriorityDictionary();
    dictionaryStore.getStatusDictionary();
  }, []);

  const sprintDatasourceToDropdownContent = (datasource: Sprint[]) => {
    return datasource.map((sprint) => {
      return {
        key: sprint.id,
        label: `Sprint ${formatDate(sprint.startDate)} - ${formatDate(sprint.endDate)}`,
        onClick: () => setSelectedSprintId(sprint.id),
      };
    });
  };

  const sprintMenuItems: MenuProps["items"] =
    datasource !== null ? sprintDatasourceToDropdownContent(datasource) : [];

  const sprintMenuProps = {
    items: sprintMenuItems,
  };

  const renderTitle = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Sprint Dashboard</h2>
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
            <TaskDrawer
              task={null}
              button={TaskDrawerButton.ADD}
              mode={TaskDrawerMode.ADD}
            />
            <Space.Compact>
              <Dropdown menu={sprintMenuProps}>
                <Button>
                  {`Sprint ${formatDate(selectedSprint?.startDate)} - ${formatDate(selectedSprint?.endDate)}`}
                </Button>
              </Dropdown>
              <AddSprintModal lastSprintEndDate={datasource[0]?.endDate} />
            </Space.Compact>
          </Space>
        </div>
        <TaskBoard selectedSprint={selectedSprint!} />
      </Card>
    </div>
  );
});
