import { Drawer } from "antd";
import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { User } from "../stores/UserStore";

export const EmployeeDrawer = observer(({ user }: { user: User }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <>
      <span onClick={() => setDrawerIsOpen(true)} style={{ cursor: "pointer" }}>
        <EyeOutlined />
      </span>
      <Drawer
        title={`${user.firstName} ${user.lastName}`}
        open={drawerIsOpen}
        closable={false}
        width={"35%"}
        onClose={() => setDrawerIsOpen(false)}
        placement="right"
      >
        Text
      </Drawer>
    </>
  );
});
