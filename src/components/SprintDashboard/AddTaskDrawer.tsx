import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { observer } from "mobx-react";
import React from "react";
import { dictionaryStore } from "../../stores/DictionaryStore";
import { FORM_ITEM_STYLE } from "../../models/ui";
import { sprintStore } from "../../stores/SprintStore";
import { userStore } from "../../stores/UserStore";
import { Task, taskStore } from "../../stores/TaskStore";

export const AddTaskDrawer = observer(
  ({ closeDrawer }: { closeDrawer: () => void }) => {
    const [form] = Form.useForm();

    const handleAddTaskForm = (task: Task) => {
      console.log(task);
      var teamId = userStore.currentUser?.user.team.id!;
      taskStore.create(task, teamId);
      //form.resetFields();
      closeDrawer();
    };

    return (
      <Form<Task>
        form={form}
        name="addTaskForm"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        onFinish={handleAddTaskForm}
      >
        <Form.Item
          label="Title"
          name={"title"}
          style={{ marginBottom: 0 }}
          rules={[
            {
              required: true,
              message: "Please enter a title.",
            },
          ]}
        >
          <Input style={FORM_ITEM_STYLE} />
        </Form.Item>
        <Form.Item
          label="Priority"
          name={"priorityId"}
          style={{ marginBottom: 0, marginTop: 24 }}
          rules={[
            {
              required: true,
              message: "Please select a priority.",
            },
          ]}
        >
          <Select
            options={dictionaryStore.priorityAsDatasource}
            style={FORM_ITEM_STYLE}
          />
        </Form.Item>
        <Form.Item
          label="Sprint"
          name={"sprintId"}
          style={{ marginBottom: 0, marginTop: 24 }}
          rules={[
            {
              required: true,
              message: "Please select a sprint.",
            },
          ]}
        >
          <Select
            options={sprintStore.sprintsAsDatasource}
            style={FORM_ITEM_STYLE}
          />
        </Form.Item>
        <Form.Item
          label="Assigned to"
          name={"assigneeId"}
          style={{ marginBottom: 0, marginTop: 24 }}
          rules={[
            {
              required: true,
              message: "Please assign to team member.",
            },
          ]}
        >
          <Select
            options={userStore.allUsers.map((user) => ({
              label: `${user.firstName} ${user.lastName}(${user.username})`,
              value: user.id.toString(),
            }))}
            style={FORM_ITEM_STYLE}
          />
        </Form.Item>
        <Form.Item
          label="Estimation"
          name={"estimation"}
          style={{ marginBottom: 0, marginTop: 24 }}
          rules={[
            {
              required: true,
              message: "Please provide an estimation",
            },
          ]}
        >
          <InputNumber style={FORM_ITEM_STYLE} />
        </Form.Item>
        <span style={{ fontSize: 11 }}>Expressed in hours.</span>
        <Form.Item
          label="Description"
          name={"description"}
          style={{ marginBottom: 0, marginTop: 24 }}
          rules={[
            {
              required: true,
              message: "Please enter a description.",
            },
          ]}
        >
          <TextArea rows={4} style={FORM_ITEM_STYLE} />
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
    );
  },
);
