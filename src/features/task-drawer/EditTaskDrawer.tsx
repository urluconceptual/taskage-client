import { Button, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { observer } from "mobx-react";
import React, { Dispatch, SetStateAction } from "react";
import { Task } from "../../models/Task";
import { dictionaryStore } from "../../stores/DictionaryStore";
import { sprintStore } from "../../stores/SprintStore";
import { taskStore } from "../../stores/TaskStore";
import { userStore } from "../../stores/UserStore";
import { FORM_ITEM_STYLE, TaskDrawerMode } from "../../utils/ui";

export const EditTaskDrawer = observer(
  ({
    closeDrawer,
    setCurrentDrawerMode,
    task,
  }: {
    closeDrawer: () => void;
    setCurrentDrawerMode: Dispatch<SetStateAction<TaskDrawerMode>>;
    task: Task;
  }) => {
    const [form] = Form.useForm();

    const handleCancelClick = () => {
      setCurrentDrawerMode(TaskDrawerMode.VIEW);
    };

    const handleEditTaskForm = (editedTask: Task) => {
      editedTask.id = task.id;
      var teamId = userStore.currentUser?.user.team.id!;
      taskStore.update(editedTask, teamId);
      form.resetFields();
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
        onFinish={handleEditTaskForm}
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
          initialValue={task.title}
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
          initialValue={task.priorityId.toString()}
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
          initialValue={task.sprintId.toString()}
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
          initialValue={task.assigneeId.toString()}
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
          label="Status"
          name={"statusId"}
          style={{ marginBottom: 0, marginTop: 24 }}
          rules={[
            {
              required: true,
              message: "Please select a status.",
            },
          ]}
          initialValue={task.statusId.toString()}
        >
          <Select
            options={dictionaryStore.statusAsDatasource}
            style={FORM_ITEM_STYLE}
          />
        </Form.Item>
        <Form.Item
          label="Progress"
          name={"progress"}
          style={{ marginBottom: 0, marginTop: 24 }}
          rules={[
            {
              required: true,
              message: "Please provide a progress estimate",
            },
            {
              type: "number",
              min: 0,
              message: "Estimation must be greater than 0.",
            },
          ]}
          initialValue={task.progress}
        >
          <InputNumber style={FORM_ITEM_STYLE} />
        </Form.Item>
        <span style={{ fontSize: 11 }}>Expressed in hours.</span>
        <Form.Item
          label="Estimation"
          name={"estimation"}
          style={{ marginBottom: 0, marginTop: 24 }}
          rules={[
            {
              required: true,
              message: "Please provide an estimation",
            },
            {
              type: "number",
              min: 0,
              message: "Estimation must be greater than 0.",
            },
          ]}
          initialValue={task.estimation}
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
          initialValue={task.description}
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
            <Button style={{ width: "30%" }} onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button style={{ width: "68%" }} type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
);
