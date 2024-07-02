import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Task } from "../../models/Task";
import { TaskType } from "../../models/TaskType";
import { dictionaryStore } from "../../stores/DictionaryStore";
import { sprintStore } from "../../stores/SprintStore";
import { taskStore } from "../../stores/TaskStore";
import { taskTypeStore } from "../../stores/TaskTypeStore";
import { userStore } from "../../stores/UserStore";
import { STYLESHEET_LIGHT } from "../../utils/consts";
import { FORM_ITEM_STYLE, filterOption } from "../../utils/ui";
import { set } from "mobx";

export const AddTaskDrawer = observer(
  ({ closeDrawer }: { closeDrawer: () => void }) => {
    const [form] = Form.useForm();
    const [taskTypeDataSource, setTaskTypeDataSource] = useState<TaskType[]>(
      []
    );
    const [newTaskType, setNewTaskType] = useState("");
    const [canRequestSuggestions, setCanRequestSuggestions] = useState(false);
    const [showBestOptionPopconfirm, setShowBestOptionPopconfirm] =
      useState(false);
    const [bestOption, setBestOption] = useState<number>(-1);
    const [bestOptionDescription, setBestOptionDescription] = useState<string>(
      "Please fill in: priority, sprint, effort points and type to find best option."
    );

    useEffect(() => {
      taskTypeStore.getAll();
    }, []);

    useEffect(() => {
      setTaskTypeDataSource(taskTypeStore.allTaskTypes);
    }, [taskTypeStore.allTaskTypes]);

    const retryGetSuggestions = () => {
      setCanRequestSuggestions(
        sprintStore.allSprints
          .map((sprint) => sprint.tasks.length)
          .reduce((acc, x) => acc + x, 0) !== 0 &&
          form.getFieldValue("taskType") &&
          form.getFieldValue("effortPoints") &&
          form.getFieldValue("priorityId")
      );
    };

    const addTaskType = () => {
      setTaskTypeDataSource((prev) => [...prev, { id: -1, name: newTaskType }]);
      setNewTaskType("");
    };

    const handleAddTaskForm = (formObj: any) => {
      const newTask: Task = {
        ...formObj,
        taskType: {
          id:
            parseInt(formObj.taskType) != -1
              ? parseInt(formObj.taskType)
              : null,
          name:
            parseInt(formObj.taskType) != -1
              ? null
              : taskTypeDataSource.find((taskType) => taskType.id === -1)?.name,
        },
      };
      taskStore.create(newTask);
      form.resetFields();
      closeDrawer();
    };

    const findBestOption = async () => {
      if (!canRequestSuggestions) {
        setBestOption(-1);
        setBestOptionDescription(
          "Please fill in: priority, effort points and type to find best option."
        );
      } else {
        const priorityId = form.getFieldValue("priorityId");
        const effortPoints = form.getFieldValue("effortPoints");
        const taskType = form.getFieldValue("taskType");

        const recommendation = await taskStore.findBestOption(
          priorityId,
          effortPoints,
          taskType
        );
        setBestOption(recommendation);
        setBestOptionDescription(
          `${userStore.userDictionary[recommendation]?.userLabel} is a great option for this task.`
        );
      }
      setShowBestOptionPopconfirm(true);
    };

    const handleConfirmBestOption = () => {
      form.setFieldValue("assigneeId", bestOption.toString());
      setShowBestOptionPopconfirm(false);
    };

    const getAssigneeOptions = () => {
      if (!userStore.currentUser?.user.authRole?.includes("ROLE_MANAGER"))
        return [
          {
            label: `${userStore.currentUser?.user.firstName} ${userStore.currentUser?.user.lastName}(${userStore.currentUser?.user.username})`,
            value: userStore.currentUser?.user.id.toString(),
          },
        ];

      return userStore.allUsers.map((user) => ({
        label: `${user.firstName} ${user.lastName}(${user.username})`,
        value: user.id.toString(),
      }));
    };

    const renderFindBestOptionButton = () => {
      if (!userStore.currentUser?.user.authRole?.includes("ROLE_MANAGER"))
        return null;

      return (
        <Popconfirm
          title="Find best option"
          description={bestOptionDescription}
          open={showBestOptionPopconfirm}
          okText={canRequestSuggestions ? "Confirm option" : "I understand"}
          cancelText="Cancel"
          onConfirm={() => handleConfirmBestOption()}
          onCancel={() => setShowBestOptionPopconfirm(false)}
        >
          <Button
            type="primary"
            style={{ marginBottom: 0, marginTop: 24 }}
            onClick={findBestOption}
          >
            Find Best Option
          </Button>
        </Popconfirm>
      );
    };

    return (
      <Form
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
            onChange={retryGetSuggestions}
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
            onChange={retryGetSuggestions}
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
        >
          <InputNumber onChange={retryGetSuggestions} style={FORM_ITEM_STYLE} />
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
            onChange={retryGetSuggestions}
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
          <Select options={getAssigneeOptions()} style={FORM_ITEM_STYLE} />
        </Form.Item>
        {renderFindBestOptionButton()}
        <Form.Item
          label="Estimation"
          name={"estimation"}
          style={{ marginBottom: 0, marginTop: 12 }}
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
  }
);
