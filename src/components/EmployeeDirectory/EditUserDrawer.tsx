import { observer } from "mobx-react";
import {
  User,
  UserDrawerMode,
  UserRequestObj,
  userStore,
} from "../../stores/UserStore";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Divider, Form, Input, Select } from "antd";
import { teamStore } from "../../stores/TeamStore";
import { STYLESHEET_LIGHT } from "../../models/consts";
import { PlusOutlined } from "@ant-design/icons";
import { jobTitleStore } from "../../stores/JobTitleStore";

export const EditUserDrawer = observer(
  ({ user, closeDrawer }: { user: User; closeDrawer: () => void }) => {
    const [form] = Form.useForm();
    const [jobTitleDataSource, setJobTitleDataSource] = useState(
      jobTitleStore.allJobTitles,
    );
    const [newJobTitle, setNewJobTitle] = useState("");

    useEffect(() => {
      jobTitleStore.getAll();
      teamStore.getAll();
    }, []);

    useEffect(() => {
      setJobTitleDataSource(jobTitleStore.allJobTitles);
    }, [jobTitleStore.allJobTitles]);

    const filterOption = (
      input: string,
      option?: { label: string; value: string },
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const addJobTitle = () => {
      setJobTitleDataSource((prev) => [...prev, { id: -1, name: newJobTitle }]);
      setNewJobTitle("");
    };

    const handleEditUserForm = (formObj: any) => {
      const userRequestObj: UserRequestObj = {
        id: user.id,
        username: formObj.username,
        firstName: formObj.firstName,
        lastName: formObj.lastName,
        password: formObj.password,
        authRole: formObj.authRole,
        jobTitle: {
          id:
            parseInt(formObj.jobTitle) != -1
              ? parseInt(formObj.jobTitle)
              : null,
          name:
            parseInt(formObj.jobTitle) != -1
              ? null
              : jobTitleDataSource.find((jobTitle) => jobTitle.id === -1)?.name,
        }
      };
      userStore.updateUser(userRequestObj);
      form.resetFields();
      closeDrawer();
    };

    return (
      <>
        <Form
          form={form}
          name="editUserForm"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: "150%" }}
          autoComplete="off"
          onFinish={handleEditUserForm}
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
            initialValue={user.username}
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
            initialValue={user.firstName}
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
            initialValue={user.lastName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            style={{ marginBottom: 0, marginTop: 24 }}
          >
            <Input type="password" />
          </Form.Item>
          <span style={{ fontSize: 11 }}>
            Current password is not displayed. Fill in for new password.
          </span>
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
            initialValue={user.authRole}
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
            initialValue={user.jobTitle.id?.toString()}
          >
            <Select
              showSearch
              filterOption={filterOption}
              options={jobTitleDataSource.map((jobTitle) => ({
                label: jobTitle.name!,
                value: jobTitle.id!.toString(),
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
  },
);
