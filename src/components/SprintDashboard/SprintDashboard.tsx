import React, { useEffect, useState } from "react";
import { Sprint, sprintStore } from "../../stores/SprintStore";
import { userStore } from "../../stores/UserStore";
import { Button, Card, DatePicker, DatePickerProps, Dropdown, MenuProps, Modal, Space, Tag } from "antd";
import { observer } from "mobx-react";
import { STYLESHEET_LIGHT } from "../../models/consts";
import { dictionaryStore } from "../../stores/DictionaryStore";
import { AddSprintModal } from "./AddSprintModal";

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

  const formatDate = (date: string | undefined) => {
    return date ? new Date(date).toLocaleDateString() : "";
  };

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
    datasource !== null
      ? sprintDatasourceToDropdownContent(datasource)
      : [];

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
              <Card
                title={String(value)}
                style={{
                  backgroundColor: STYLESHEET_LIGHT.colorSecondaryTransparent,
                  width: `${100 / numberOfColumns - 1}%`,
                }}
              >
                {selectedSprint?.tasks
                  .filter((task) => String(task.statusId) === key)
                  .map((task) => {
                    return (
                      <Card.Grid
                        style={{
                          backgroundColor: STYLESHEET_LIGHT.backgroundColor,
                          width: "100%",
                          margin: 5,
                        }}
                        hoverable={true}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 5,
                          }}
                        >
                          <span>{task.name}</span>
                          <span>{`${task.progress}/${task.estimation}h`}</span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Tag style={{margin: 0}} color="blue">
                              {
                                dictionaryStore.priorityDictionary[
                                  task.priorityId
                                ]
                              }
                            </Tag>
                            <Tag style={{margin: 0}} color="green">
                              {
                                userStore.userDictionary[task.assigneeId]
                                  .userLabel
                              }
                            </Tag>
                          </div>
                      </Card.Grid>
                    );
                  })}
              </Card>
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
          <Space.Compact>
            <Dropdown menu={sprintMenuProps}>
              <Button>
                {`Sprint ${formatDate(selectedSprint?.startDate)} - ${formatDate(selectedSprint?.endDate)}`}
              </Button>
            </Dropdown>
            <AddSprintModal lastSprintEndDate={datasource[0]?.endDate}/>
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
