import { Button, Form, Input, Select } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { FORM_ITEM_STYLE, TeamDrawerMode } from "../../models/ui";
import { TeamRequestObj, teamStore } from "../../stores/TeamStore";
import { Team, userStore } from "../../stores/UserStore";

export const EditTeamDrawer = ({
  closeDrawer,
  setCurrentDrawerMode,
  team,
}: {
  closeDrawer: () => void;
  team: Team;
  setCurrentDrawerMode: Dispatch<SetStateAction<TeamDrawerMode>>;
}) => {
  const [form] = Form.useForm();

  const handleEditTeamForm = (teamRequestObj: TeamRequestObj) => {
    teamRequestObj.id = team.id;
    teamRequestObj.teamMemberIds.push(teamRequestObj.teamLeadId);
    teamStore.updateTeam(teamRequestObj);
    form.resetFields();
    setCurrentDrawerMode(TeamDrawerMode.VIEW);
    closeDrawer();
  };

  useEffect(() => {
    userStore.getAll();
  }, []);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleCancelClick = () => {
    setCurrentDrawerMode(TeamDrawerMode.VIEW);
    closeDrawer();
  };

  return (
    <>
      <Form<TeamRequestObj>
        form={form}
        name="teamForm"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        onFinish={handleEditTeamForm}
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
          initialValue={team.name}
        >
          <Input style={FORM_ITEM_STYLE} />
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
          initialValue={team.teamLeadId.toString()}
        >
          <Select
            style={FORM_ITEM_STYLE}
            showSearch
            filterOption={filterOption}
            options={userStore.allUsers
              .filter(
                (user) =>
                  user.authRole === "ROLE_MANAGER" &&
                  (user.team === null || user.team!.id === team.id)
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
          initialValue={userStore.allUsers
            .filter(
              (user) =>
                user.authRole === "ROLE_BASIC" &&
                user.team &&
                user.team!.id === team.id
            )
            .map((user) => user.id.toString())}
        >
          <Select
            style={FORM_ITEM_STYLE}
            showSearch
            mode="multiple"
            filterOption={filterOption}
            options={userStore.allUsers
              .filter(
                (user) =>
                  user.authRole === "ROLE_BASIC" &&
                  (user.team === null || user.team!.id === team.id)
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
              width: "145%",
            }}
          >
            <Button style={{ width: "30%" }} onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button style={{ width: "68%" }} type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
