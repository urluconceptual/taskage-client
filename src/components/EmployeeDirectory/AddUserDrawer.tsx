import { Button, Divider, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { UserRequestObj, userStore } from "../../stores/UserStore";
import { jobTitleStore } from "../../stores/JobTitleStore";
import { PlusOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { STYLESHEET_LIGHT } from "../../models/consts";
import { teamStore } from "../../stores/TeamStore";
import { FORM_ITEM_STYLE } from "../../models/ui";

export const AddUserDrawer = observer(
  ({ closeDrawer }: { closeDrawer: () => void }) => {
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

    const handleAddUserForm = (formObj: any) => {
      const userRequestObj: UserRequestObj = {
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
        },
      };
      userStore.addNewUser(userRequestObj);
      form.resetFields();
      closeDrawer();
    };

    return (
      <>
        <Form
          form={form}
          name="addUserForm"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          onFinish={handleAddUserForm}
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
            <Input style={FORM_ITEM_STYLE} />
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
            <Input style={FORM_ITEM_STYLE} />
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
            <Input style={FORM_ITEM_STYLE} />
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
            <Input type="password" style={FORM_ITEM_STYLE} />
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
            <Select style={FORM_ITEM_STYLE}>
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
              style={FORM_ITEM_STYLE}
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
  },
);
