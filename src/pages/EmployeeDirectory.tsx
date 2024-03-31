import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import {
  userStore,
  User,
  Team,
} from "../stores/UserStore";
import { Button, Card, CollapseProps, Input, Space } from "antd";
import { Collapse } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { UserDrawer } from "../components/EmployeeDirectory/UserDrawer";
import { JobTitle } from "../stores/JobTitleStore";
import { UserDrawerButton, UserDrawerMode } from "../models/ui";

const AuthRoleLabel: { [key: string]: string } = {
  ROLE_BASIC: "BASIC",
  ROLE_MANAGER: "MANAGER",
  ROLE_ADMIN: "ADMIN",
};

export const EmployeeDirectory = observer(() => {
  const [dataSource, setDataSource] = useState<User[]>();
  const [filterOptions, setFilterOptions] = useState({
    username: "",
    jobTitle: "",
    team: "",
  });

  useEffect(() => {
    setDataSource(userStore.allUsers);
  }, [userStore.allUsers]);

  useEffect(() => {
    userStore.getAll();
  }, []);

  const handleFilter = () => {
    setDataSource(
      userStore.allUsers.filter((user) => {
        return (
          user.username
            .toLowerCase()
            .includes(filterOptions.username.toLowerCase()) &&
          user.jobTitle
            .name!.toLowerCase()
            .includes(filterOptions.jobTitle.toLowerCase()) &&
          (user.team === null ||
            user.team?.name
              .toLowerCase()
              .includes(filterOptions.team.toLowerCase()))
        );
      }),
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
              value={filterOptions.username}
              onChange={(e) =>
                setFilterOptions((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              placeholder="Username"
            />
            <Input
              value={filterOptions.jobTitle}
              onChange={(e) =>
                setFilterOptions((prev) => ({
                  ...prev,
                  jobTitle: e.target.value,
                }))
              }
              placeholder="Job Title"
            />
            <Input
              value={filterOptions.team}
              onChange={(e) =>
                setFilterOptions((prev) => ({ ...prev, team: e.target.value }))
              }
              placeholder="Team"
            />
            <Button type="primary" onClick={handleFilter}>
              Filter
            </Button>
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
        return AuthRoleLabel[authRole] || "UNDEFINED ROLE";
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
      title: "Edit",
      key: "action",
      render: (text, record) => {
        return (
          <UserDrawer
            user={record}
            button={UserDrawerButton.EDIT}
            mode={UserDrawerMode.EDIT}
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
        <h2>Employee Directory</h2>
        <UserDrawer
          user={null}
          button={UserDrawerButton.ADD}
          mode={UserDrawerMode.ADD}
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
