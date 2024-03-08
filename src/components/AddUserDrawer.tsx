import { Button, Divider, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { UserRequestObj } from "../stores/UserStore";
import { jobTitleStore } from "../stores/JobTitleStore";
import { PlusOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { STYLESHEET_LIGHT } from "../models/consts";
import { teamStore } from "../stores/TeamStore";

export const AddUserDrawer = observer(
  ({ closeDrawer }: { closeDrawer: () => void }) => {
    const [form] = Form.useForm();
    const [jobTitleDataSource, setJobTitleDataSource] = useState(
      jobTitleStore.allJobTitles
    );
    const [newJobTitle, setNewJobTitle] = useState("");
    const teamDropdownIsDisabled = form.getFieldValue("authRole") === undefined;

    console.log(form.getFieldValue("authRole"));

    useEffect(() => {
      jobTitleStore.getAll();
      teamStore.getAll();
    }, []);

    useEffect(() => {
      setJobTitleDataSource(jobTitleStore.allJobTitles);
    }, [jobTitleStore.allJobTitles]);

    const filterOption = (
      input: string,
      option?: { label: string; value: string }
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const addJobTitle = () => {
      setJobTitleDataSource((prev) => [...prev, { id: -1, name: newJobTitle }]);
      setNewJobTitle("");
    };

    return (
      <>
        <Form<UserRequestObj>
          form={form}
          name="teamForm"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: "150%" }}
          autoComplete="off"
          //onFinish={handleAddTeamForm}
        >
          <Form.Item
            label="Username"
            name={"username"}
            style={{ marginBottom: 0 }}
            rules={[
              {
                required: true,
                message: "Please enter a username.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <span style={{ fontSize: 11 }}>Has to be unique.</span>
          <Form.Item
            label="First Name"
            name={"firstName"}
            style={{ marginBottom: 0, marginTop: 24 }}
            rules={[
              {
                required: true,
                message: "Please enter a first name.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name={"lastName"}
            style={{ marginBottom: 0, marginTop: 24 }}
            rules={[
              {
                required: true,
                message: "Please enter a last name.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            style={{ marginBottom: 0, marginTop: 24 }}
            rules={[
              {
                required: true,
                message: "Please enter a password.",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Authorization Level"
            name={"authRole"}
            style={{ marginBottom: 0, marginTop: 24 }}
            rules={[
              {
                required: true,
                message: "Please select an authorization level.",
              },
            ]}
          >
            <Select>
              <Select.Option value="ROLE_BASIC">BASIC</Select.Option>
              <Select.Option value="ROLE_MANAGER">MANAGER</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Job Title"
            name={"jobTitle"}
            style={{ marginBottom: 0, marginTop: 24 }}
            rules={[
              {
                required: true,
                message: "Please provide a job title.",
              },
            ]}
          >
            <Select
              showSearch
              filterOption={filterOption}
              options={jobTitleDataSource.map((jobTitle) => ({
                label: jobTitle.name,
                value: jobTitle.id.toString(),
              }))}
              notFoundContent={null}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <div style={{ padding: "0 8px 4px", display: "flex" }}>
                    <Input
                      placeholder="Add job title"
                      value={newJobTitle}
                      onChange={(e) => {
                        setNewJobTitle(e.target.value);
                      }}
                    />
                    <Button
                      type="text"
                      icon={
                        <PlusOutlined
                          style={{ color: STYLESHEET_LIGHT.colorPrimary }}
                        />
                      }
                      onClick={addJobTitle}
                    />
                  </div>
                </div>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Team"
            name={"team"}
            style={{ marginBottom: 0, marginTop: 24 }}
          >
            <Select
              showSearch
              filterOption={filterOption}
              options={teamStore.allTeams.map((team) => ({
                label: team.name,
                value: team.id.toString(),
              }))}
              notFoundContent={null}
              disabled={teamDropdownIsDisabled}
            />
          </Form.Item>
          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 24,
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
  }
);
