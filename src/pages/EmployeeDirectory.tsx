import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { userStore, User, JobTitle, Team } from "../stores/UserStore";
import { Button, Card, CollapseProps, Input, Select, Space } from "antd";
import { Collapse } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AddEmployeeForm } from "../components/AddEmployeeForm";
import { EmployeeDrawer } from "../components/EmployeeDrawer";
import { observer } from "mobx-react";

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
              { value: "ROLE_BASIC", label: "BASIC" },
              { value: "ROLE_MANAGER", label: "MANAGER" },
              { value: "ROLE_ADMIN", label: "ADMIN" },
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
      render: (team: Team) => (team ? team.name : "-"),
    },
    {
      title: "View",
      key: "action",
      render: (text, record) => {
        return <EmployeeDrawer user={record} />;
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
        <h2>Employee Directory</h2>
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
          size="middle"
          rowKey={(record) => record.id.toString()}
          style={{ width: "100%" }}
        />
      </Card>
    </div>
  );
});
