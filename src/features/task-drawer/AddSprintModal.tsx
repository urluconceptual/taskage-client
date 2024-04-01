import { Button, DatePicker, DatePickerProps, Modal } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { SprintCreateRequest } from "../../models/Sprint";
import { sprintStore } from "../../stores/SprintStore";
import { userStore } from "../../stores/UserStore";

export const AddSprintModal = observer(
  ({ lastSprintEndDate }: { lastSprintEndDate: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInterval, setSelectedInterval] = useState<any>();

    const disabledDate: DatePickerProps["disabledDate"] = (current: Dayjs) => {
      const dateOfLastSprint = Date.parse(lastSprintEndDate);
      return (
        current &&
        (!dateOfLastSprint ||
          current.endOf("day") <= dayjs(dateOfLastSprint).endOf("day"))
      );
    };

    const handleAddSprint = () => {
      const sprintCreateRequest: SprintCreateRequest = {
        teamId: userStore.currentUser?.user.team.id!,
        startDate: selectedInterval[0],
        endDate: selectedInterval[1],
      };
      sprintStore.create(sprintCreateRequest);
      setSelectedInterval([]);
      setIsModalOpen(false);
    };

    return (
      <>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          +
        </Button>
        <Modal
          title="New sprint"
          open={isModalOpen}
          onOk={handleAddSprint}
          onCancel={() => setIsModalOpen(false)}
          width={500}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DatePicker.RangePicker
              style={{ width: 400 }}
              disabledDate={disabledDate}
              onChange={(dates) => {
                setSelectedInterval([
                  dates?.[0]?.toString(),
                  dayjs(dates?.[1]?.toString()),
                ]);
              }}
            />
          </div>
        </Modal>
      </>
    );
  }
);
