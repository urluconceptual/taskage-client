import { Button, Form, Input, Select } from "antd";
import React from "react";
import { TeamRequestObj } from "../../models/Team";
import { teamStore } from "../../stores/TeamStore";
import { userStore } from "../../stores/UserStore";
import { FORM_ITEM_STYLE } from "../../utils/ui";

export const AddTeamDrawer = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const [form] = Form.useForm();

  const handleAddTeamForm = (teamRequestObj: TeamRequestObj) => {
    teamRequestObj.teamMemberIds.push(teamRequestObj.teamLeadId);
    teamStore.addNewTeam(teamRequestObj);
    form.resetFields();
    closeDrawer();
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Form<TeamRequestObj>
        form={form}
        name="teamForm"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
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
        >
          <Select
            style={FORM_ITEM_STYLE}
            showSearch
            filterOption={filterOption}
            options={userStore.allUsers
              .filter(
                (user) => user.authRole === "ROLE_MANAGER" && user.team === null
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
            style={FORM_ITEM_STYLE}
            showSearch
            mode="multiple"
            filterOption={filterOption}
            options={userStore.allUsers
              .filter(
                (user) => user.authRole === "ROLE_BASIC" && user.team === null
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
            <Button style={{ width: "30%" }} onClick={closeDrawer}>
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
