import { List } from "antd";
import React from "react";
import { Team } from "../stores/UserStore";

export const ViewTeamDrawer = ({
  team,
  closeDrawer,
}: {
  team: Team;
  closeDrawer: () => void;
}) => {
  return (
    <>
      <List></List>
    </>
  );
};
