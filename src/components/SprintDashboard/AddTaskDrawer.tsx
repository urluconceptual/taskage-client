import { Form, Input } from "antd";
import { observer } from "mobx-react";
import React from "react";

export const AddTaskDrawer = observer(
  ({ closeDrawer }: { closeDrawer: () => void }) => {
    const [form] = Form.useForm();

    return (
      <Form
        form={form}
        name="addTaskForm"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: "150%" }}
        autoComplete="off"
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
          <Input />
        </Form.Item>
      </Form>
    );
  },
);
