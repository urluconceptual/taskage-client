import { Button, Dropdown, MenuProps, Space } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { TaskDrawerButton, TaskDrawerMode, formatDate } from "../../models/ui";
import { dictionaryStore } from "../../stores/DictionaryStore";
import { Sprint, sprintStore } from "../../stores/SprintStore";
import { userStore } from "../../stores/UserStore";
import { AddSprintModal } from "./AddSprintModal";
import { TaskDrawer } from "./TaskDrawer";
import { TaskSection } from "./TaskSection";

export const SprintDashboard = observer(() => {
  const [datasource, setDatasource] = useState<Sprint[]>([]);
  const [selectedSprint, setSelectedSprint] = useState<Sprint>();

  useEffect(() => {
    setDatasource(sprintStore.allSprints.sort((a, b) => b.id - a.id));
    setSelectedSprint(sprintStore.allSprints[0]);
  }, [sprintStore.allSprints]);

  useEffect(() => {
    var teamId = userStore.currentUser?.user.team.id!;
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
        onClick: () => setSelectedSprint(sprint),
      };
    });
  };

  const sprintMenuItems: MenuProps["items"] =
    datasource !== null ? sprintDatasourceToDropdownContent(datasource) : [];

  const sprintMenuProps = {
    items: sprintMenuItems,
  };

  const renderStatusColumns = () => {
    const numberOfColumns = Object.entries(
      dictionaryStore.statusDictionary
    ).length;
    return (
      <>
        {Object.entries(dictionaryStore.statusDictionary).map(
          ([key, value]) => {
            return (
              <TaskSection
                status={{ id: key, name: value }}
                numberOfColumns={numberOfColumns}
                selectedSprint={selectedSprint!}
              />
            );
          }
        )}
      </>
    );
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
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {renderStatusColumns()}
      </div>
    </>
  );
});
