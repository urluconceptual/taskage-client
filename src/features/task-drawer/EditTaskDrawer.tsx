import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { observer } from "mobx-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Task } from "../../models/Task";
import { TaskType } from "../../models/TaskType";
import { dictionaryStore } from "../../stores/DictionaryStore";
import { sprintStore } from "../../stores/SprintStore";
import { taskStore } from "../../stores/TaskStore";
import { taskTypeStore } from "../../stores/TaskTypeStore";
import { userStore } from "../../stores/UserStore";
import { STYLESHEET_LIGHT } from "../../utils/consts";
import { FORM_ITEM_STYLE, TaskDrawerMode, filterOption } from "../../utils/ui";

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
    const [newTaskType, setNewTaskType] = useState("");
    const [taskTypeDataSource, setTaskTypeDataSource] = useState<TaskType[]>(
      []
    );
    const [canRequestSuggestions, setCanRequestSuggestions] = useState(true);

    useEffect(() => {
      taskTypeStore.getAll();
    }, []);

    useEffect(() => {
      setTaskTypeDataSource(taskTypeStore.allTaskTypes);
    }, [taskTypeStore.allTaskTypes]);

    const handleCancelClick = () => {
      setCurrentDrawerMode(TaskDrawerMode.VIEW);
    };

    const handleEditTaskForm = (editedTask: any) => {
      const editedTaskObj: Task = {
        id: task.id,
        title: editedTask.title,
        description: editedTask.description,
        statusId: parseInt(editedTask.statusId),
        priorityId: parseInt(editedTask.priorityId),
        sprintId: parseInt(editedTask.sprintId),
        assigneeId: parseInt(editedTask.assigneeId),
        effortPoints: editedTask.effortPoints,
        progress: editedTask.progress,
        estimation: editedTask.estimation,
        taskType: {
          id: parseInt(editedTask.taskType),
          name:
            parseInt(editedTask.taskType) !== -1
              ? taskTypeDataSource.find(
                  (taskType) => taskType.id === parseInt(editedTask.taskType)
                )?.name
              : editedTask.taskType,
        },
      };
      var teamId = userStore.currentUser?.user.team.id!;
      taskStore.update(editedTaskObj, teamId);
      form.resetFields();
      closeDrawer();
    };

    const retryGetSuggestions = () => {
      setCanRequestSuggestions(
        !(
          sprintStore.allSprints
            .map((sprint) => sprint.tasks.length)
            .reduce((acc, x) => acc + x, 0) !== 0 &&
          form.getFieldValue("taskType") &&
          form.getFieldValue("effortPoints") &&
          form.getFieldValue("priorityId") &&
          form.getFieldValue("sprintId")
        )
      );
    };

    const addTaskType = () => {
      setTaskTypeDataSource((prev) => [...prev, { id: -1, name: newTaskType }]);
      setNewTaskType("");
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
        <Button type="primary" disabled={canRequestSuggestions}>
          Find best option
        </Button>
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
          label="Effort Points"
          name={"effortPoints"}
          style={{ marginBottom: 0, marginTop: 24 }}
          rules={[
            {
              required: true,
              message: "Please provide a value for effort points.",
            },
            {
              type: "number",
              min: 0,
              message: "Effort must be greater than 0.",
            },
          ]}
          initialValue={task.effortPoints}
        >
          <InputNumber style={FORM_ITEM_STYLE} />
        </Form.Item>
        <Form.Item
          label="Type"
          name={"taskType"}
          style={{ marginBottom: 0, marginTop: 24 }}
          rules={[
            {
              required: true,
              message: "Please select.",
            },
          ]}
          initialValue={task.taskType.id?.toString()}
        >
          <Select
            style={FORM_ITEM_STYLE}
            showSearch
            filterOption={filterOption}
            options={taskTypeDataSource.map((taskType) => ({
              label: taskType.name!,
              value: taskType.id!.toString(),
            }))}
            notFoundContent={null}
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <div style={{ padding: "0 8px 4px", display: "flex" }}>
                  <Input
                    placeholder="Add task type"
                    value={newTaskType}
                    onChange={(e) => {
                      setNewTaskType(e.target.value);
                      retryGetSuggestions();
                    }}
                  />

                  <Button
                    type="text"
                    icon={
                      <PlusOutlined
                        style={{ color: STYLESHEET_LIGHT.colorPrimary }}
                      />
                    }
                    onClick={addTaskType}
                  />
                </div>
              </div>
            )}
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
