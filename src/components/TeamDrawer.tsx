import { Button, Drawer, Form, Input, Select, Image } from "antd";
import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Team, userStore } from "../stores/UserStore";
import {
  TeamDrawerButton,
  TeamDrawerMode,
  TeamRequestObj,
  teamStore,
} from "../stores/TeamStore";

export const TeamDrawer = observer(
  ({
    team,
    button,
    mode,
  }: {
    team: Team | null;
    button: TeamDrawerButton;
    mode: TeamDrawerMode;
  }) => {
    const [form] = Form.useForm();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const renderButton = (button: TeamDrawerButton) => {
      switch (button) {
        case TeamDrawerButton.VIEW:
          return <EyeOutlined />;
        case TeamDrawerButton.ADD:
          return (
            <Button onClick={() => setDrawerIsOpen(true)} type="primary">
              Add Team
            </Button>
          );
      }
    };

    const filterOption = (
      input: string,
      option?: { label: string; value: string },
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const closeDrawer = () => {
      setDrawerIsOpen(false);
      form.resetFields();
    };

    const handleAddTeamForm = (teamRequestObj: TeamRequestObj) => {
      console.log(teamRequestObj.teamMemberIds);
      teamRequestObj.teamMemberIds.push(teamRequestObj.teamLeadId);
      teamStore.addNewTeam(teamRequestObj);
      closeDrawer();
    };

    const renderAddDrawer = () => {
      return (
        <>
          <Form<TeamRequestObj>
            form={form}
            name="teamForm"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: "150%" }}
            autoComplete="off"
            onFinish={handleAddTeamForm}
          >
            <Form.Item
              label="Name"
              name={"name"}
              style={{ marginBottom: 0 }}
              rules={[
                {
                  required: true,
                  message: "Please enter a name for the team.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <span style={{ fontSize: 11 }}>Has to be unique.</span>
            <Form.Item
              label="Team Lead"
              name={"teamLeadId"}
              style={{ marginBottom: 0, marginTop: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please select a team lead for the team.",
                },
              ]}
            >
              <Select
                showSearch
                filterOption={filterOption}
                options={userStore.allUsers
                  .filter(
                    (user) =>
                      user.authRole === "ROLE_MANAGER" && user.team === null,
                  )
                  .map((user) => ({
                    label: `${user.firstName} ${user.lastName}(${user.username})`,
                    value: user.id.toString(),
                  }))}
              />
            </Form.Item>
            <span style={{ fontSize: 11 }}>
              Cannot find user? Check that the authorization level is MANAGER.
            </span>
            <Form.Item
              label="Team Members"
              name="teamMemberIds"
              style={{ marginBottom: 0, marginTop: 24 }}
            >
              <Select
                showSearch
                mode="multiple"
                filterOption={filterOption}
                options={userStore.allUsers
                  .filter(
                    (user) =>
                      user.authRole === "ROLE_BASIC" && user.team === null,
                  )
                  .map((user) => ({
                    label: `${user.firstName} ${user.lastName}(${user.username})`,
                    value: user.id.toString(),
                  }))}
              ></Select>
            </Form.Item>
            <span style={{ fontSize: 11 }}>
              All users have to be unassigned before selection.
            </span>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 24,
                }}
              >
                <Button style={{ width: "30%" }} onClick={() => closeDrawer()}>
                  Cancel
                </Button>
                <Button
                  style={{ width: "68%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
              </div>
            </Form.Item>
          </Form>
        </>
      );
    };

    const renderContent = () => {
      switch (mode) {
        case TeamDrawerMode.ADD:
          return renderAddDrawer();
        case TeamDrawerMode.VIEW:
          return <div>VIEW</div>;
      }
    };

    return (
      <>
        <span
          onClick={() => setDrawerIsOpen(true)}
          style={{ cursor: "pointer" }}
        >
          {renderButton(button)}
        </span>
        <Drawer
          title={mode === TeamDrawerMode.ADD ? "New Team" : team!.name}
          open={drawerIsOpen}
          closable={false}
          width={"35%"}
          onClose={() => closeDrawer()}
          placement="right"
        >
          {renderContent()}
        </Drawer>
      </>
    );
  },
);
