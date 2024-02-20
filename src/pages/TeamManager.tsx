import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { JobTitle, Team, userStore } from "../stores/UserStore";
import { Button, Card, Collapse, CollapseProps, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  TeamDrawerButton,
  TeamDrawerMode,
  teamStore,
} from "../stores/TeamStore";
import { observer } from "mobx-react";
import { TeamDrawer } from "../components/TeamDrawer";

// Define the Team objects
let team1: Team = { id: 1, name: "Engineering", teamLeadId: 1 };
let team2: Team = { id: 2, name: "Product", teamLeadId: 2 };

export const TeamManager = observer(() => {
  const dataSource: Team[] = teamStore.allTeams;

  useEffect(() => {
    userStore.getAll();
    teamStore.getAll();
  }, []);

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
            <Input placeholder="Username" />
            <Input placeholder="Job Title" />
            <Input placeholder="Team" />
            <Button type="primary">Filter</Button>
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
        console.log(teamLeadId, userStore.userDictionary[teamLeadId]);
        return userStore.userDictionary[teamLeadId];
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
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 10,
      }}
    >
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
    </div>
  );
});
