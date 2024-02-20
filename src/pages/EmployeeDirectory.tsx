import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { userStore, User, JobTitle, Team } from "../stores/UserStore";
import { Button, Card, CollapseProps, Input, Select, Space } from "antd";
import { Collapse } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AddEmployeeForm } from "../components/AddEmployeeForm";
import { EmployeeDrawer } from "../components/EmployeeDrawer";
import { observer } from "mobx-react";

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

export const EmployeeDirectory = observer(() => {
  const dataSource: User[] = userStore.allUsers;

  useEffect(() => {
    userStore.getAll();
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

  const columns: ColumnsType<User> = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Full Name",
      dataIndex: "firstName",
      key: "fullName",
      render: (firstName, record) => `${firstName} ${record.lastName}`,
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
              { value: "ROLE_EMPLOYEE", label: "ROLE_EMPLOYEE" },
              { value: "ROLE_ADMIN", label: "ROLE_ADMIN" },
              { value: "ROLE_MANAGER", label: "ROLE_MANAGER" },
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
      render: (team: Team) => team? team.name : "-",
    },
    {
      title: "View",
      key: "action",
      render: (text, record) => {
        return <EmployeeDrawer user={record} />;
      },
    }
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
        <h1>Employee Directory</h1>
        <AddEmployeeForm />
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
          rowKey={(record) => record.id.toString()}
          style={{ width: "100%" }}
        />
      </Card>
    </div>
  );
});
