import { makeObservable, observable, action } from "mobx";
import axios from "axios";
import { TEAMS_API_URL } from "../models/consts";
import { message } from "antd";
import { userStore } from "./UserStore";

export interface Team {
  id: number;
  name: string;
  teamLeadId: number;
}

export enum TeamDrawerMode {
  VIEW = "view",
  EDIT = "edit",
  ADD = "add",
}

export enum TeamDrawerButton {
  VIEW = "view",
  ADD = "add",
}

export interface TeamRequestObj {
  name: string;
  teamLeadId: number;
  teamMemberIds: number[];
}

class TeamStore {
  allTeams: Team[] = [];

  constructor() {
    makeObservable(this, {
      allTeams: observable,
      getAll: action,
      getTeamMembersForTeam: action,
    });
  }

  getAll = () => {
    axios
      .get(`${TEAMS_API_URL}/getAll`)
      .then((res) => {
        switch (res.status) {
          case 200:
            this.allTeams = res.data;
            break;
          case 400:
            message.error("Bad request. Contact your admin.");
            break;
          case 401:
            message.error("Unauthorized. Log in to access.");
            break;
          case 403:
            message.error("General core error. Contact your admin.");
            break;
        }
      })
      .catch((err) => {
        message.error("General client error. Contact your admin.");
      });
  };

  addNewTeam = (team: TeamRequestObj) => {
    axios
      .post(`${TEAMS_API_URL}/create`, team)
      .then((res) => {
        switch (res.status) {
          case 200:
            this.getAll();
            message.success("Team added successfully.");
            break;
          case 400:
            message.error("Bad request. Contact your admin.");
            break;
          case 401:
            message.error("Unauthorized. Log in to access.");
            break;
          case 403:
            message.error("General core error. Contact your admin.");
            break;
        }
      })
      .catch((err) => {
        message.error("General client error. Contact your admin.");
      });
  };

  getTeamMembersForTeam = (teamId: number) => {
    return userStore.allUsers.filter((user) => user.team.id === teamId);
  };
}

export const teamStore = new TeamStore();
