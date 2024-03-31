import { makeObservable, observable, action } from "mobx";
import axios, { AxiosError } from "axios";
import { TEAMS_API_URL } from "../models/consts";
import { message } from "antd";
import { userStore } from "./UserStore";
import { Sprint } from "./SprintStore";
import { handleAxiosError } from "../utils/ErrorHandler";

export interface Team {
  id: number;
  name: string;
  teamLeadId: number;
}

export interface TeamRequestObj {
  id?: number;
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
        this.allTeams = res.data;
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  addNewTeam = (team: TeamRequestObj) => {
    axios
      .post(`${TEAMS_API_URL}/create`, team)
      .then(() => {
        this.getAll();
        message.success("Team added successfully.");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  getTeamMembersForTeam = (teamId: number) => {
    return userStore.allUsers.filter((user) => user.team.id === teamId);
  };

  updateTeam = (team: TeamRequestObj) => {
    axios
      .put(`${TEAMS_API_URL}/update`, team)
      .then(() => {
        this.getAll();
        message.success("Team updated successfully.");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  deleteTeam = (teamId: number) => {
    axios
      .delete(`${TEAMS_API_URL}/delete/${teamId}`)
      .then(() => {
        this.getAll();
        message.success("Team deleted successfully.");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };
}

export const teamStore = new TeamStore();
