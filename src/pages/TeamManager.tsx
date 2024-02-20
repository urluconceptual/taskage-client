import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { userStore, User, JobTitle, Team } from "../stores/UserStore";
import { Card, Input, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { teamStore } from "../stores/TeamStore";

//dummy data:
// Define the JobTitle objects
let jobTitle1: JobTitle = { id: 1, name: "Software Engineer" };
let jobTitle2: JobTitle = { id: 2, name: "Product Manager" };

// Define the Team objects
let team1: Team = { id: 1, name: "Engineering", teamLeadId: 1 };
let team2: Team = { id: 2, name: "Product", teamLeadId: 2 };

// Define the User objects
let user1: User = {
  id: 1,
  username: "jdoe",
  firstName: "John",
  lastName: "Doe",
  authRole: "admin",
  jobTitle: jobTitle1,
  team: team1,
};

let user2: User = {
  id: 2,
  username: "asmith",
  firstName: "Alice",
  lastName: "Smith",
  authRole: "user",
  jobTitle: jobTitle2,
  team: team2,
};

// Create a list of User objects
let users: User[] = [user1, user2];

export const TeamManager = () => {
  const dataSource: Team[] = teamStore.allTeams;

  useEffect(() => {
    teamStore.getAll();
  }, []);

  const columns: ColumnsType<Team> = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Authorization",
      dataIndex: "authRole",
      key: "authRole",
      render: (authRole) => {
        return (
          <Select
            defaultValue={authRole}
            style={{ width: 120 }}
            options={[
              { value: 1, label: "ROLE_EMPLOYEE" },
              { value: 2, label: "ROLE_ADMIN" },
              { value: 3, label: "ROLE_MANAGER" },
            ]}
          />
        );
      },
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle.name",
      render: (jobTitle: JobTitle) => jobTitle.name,
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team.name",
      render: (team: Team) => team.name,
    },
  ];

  const renderTitle = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h1>Team Manager</h1>
        <Space>
          <Space.Compact>
            <Input placeholder="Username" />
            <Input placeholder="Job Title" />
            <Input addonAfter={<SearchOutlined />} placeholder="Team" />
          </Space.Compact>
        </Space>
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
      <Card title={renderTitle()} style={{ width: "100%" }}>
        <Table
          bordered={true}
          dataSource={users}
          pagination={{
            pageSize: 10,
          }}
          rowKey={(record) => record.id.toString()}
          style={{ width: "100%" }}
        />
      </Card>
    </div>
  );
};
