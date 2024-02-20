import { Button, Form, Modal } from "antd";
import React, { useState } from "react";

import { observer } from "mobx-react";

export const AddEmployeeForm = observer(() => {
  const [formIsOpen, setFormIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setFormIsOpen(true)} type="primary">
        Add Employee
      </Button>
      <Modal
        width="650px"
        title="Add New Employee"
        open={formIsOpen}
        onCancel={() => setFormIsOpen(false)}
        footer={null}
      ></Modal>
    </>
  );
});
