import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, CollapseProps, Input, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { TeamDrawer } from "../features/team-drawer/TeamDrawer";
import { Team } from "../models/Team";
import { teamStore } from "../stores/TeamStore";
import { userStore } from "../stores/UserStore";
import { TeamDrawerButton, TeamDrawerMode } from "../utils/ui";

export const TeamManager = observer(() => {
  const [dataSource, setDataSource] = useState<Team[]>();
  const [filterOptions, setFilterOptions] = useState({
    name: "",
    teamLead: "",
  });

  useEffect(() => {
    setDataSource(teamStore.allTeams);
  }, [teamStore.allTeams]);

  useEffect(() => {
    userStore.getAll();
    teamStore.getAll();
  }, []);

  const handleFilter = () => {
    setDataSource(
      teamStore.allTeams.filter((team) => {
        return (
          team.name.toLowerCase().includes(filterOptions.name.toLowerCase()) &&
          userStore.userDictionary[team.teamLeadId].userLabel
            .toLowerCase()
            .includes(filterOptions.teamLead.toLowerCase())
        );
      })
    );
  };

  const collapseProps: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div style={{ textAlign: "center" }}>
          {" "}
          <Button>
            Advanced Search <SearchOutlined />
          </Button>
        </div>
      ),
      showArrow: false,
      children: (
        <Space>
          <Space.Compact>
            <Input
              value={filterOptions.name}
              onChange={(e) =>
                setFilterOptions((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Name"
            />
            <Input
              value={filterOptions.teamLead}
              onChange={(e) =>
                setFilterOptions((prev) => ({
                  ...prev,
                  teamLead: e.target.value,
                }))
              }
              placeholder="Team Lead"
            />
            <Button type="primary" onClick={handleFilter}>
              Filter
            </Button>
          </Space.Compact>
        </Space>
      ),
    },
  ];

  const columns: ColumnsType<Team> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Team Lead",
      dataIndex: "teamLeadId",
      key: "teamLeadId",
      render: (teamLeadId) => {
        return userStore.userDictionary[teamLeadId]?.userLabel;
      },
    },
    {
      title: "View",
      key: "action",
      render: (text, record) => {
        return (
          <TeamDrawer
            team={record}
            button={TeamDrawerButton.VIEW}
            mode={TeamDrawerMode.VIEW}
          />
        );
      },
    },
  ];

  const renderTitle = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Team Manager</h2>
        <TeamDrawer
          team={null}
          button={TeamDrawerButton.ADD}
          mode={TeamDrawerMode.ADD}
        />
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
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Collapse ghost items={collapseProps} />
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
          }}
          size="middle"
          rowKey={(record) => record.id.toString()}
          style={{ width: "100%" }}
        />
      </Card>
    </div>
  );
});
