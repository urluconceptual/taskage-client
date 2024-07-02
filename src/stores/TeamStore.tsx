import { message } from "antd";
import axios, { AxiosError } from "axios";
import { action, makeObservable, observable, reaction } from "mobx";
import { Team, TeamRequestObj } from "../models/Team";
import WebSocketService from "../utils/WebSocketService";
import { TEAMS_API_URL } from "../utils/consts";
import { handleAxiosError } from "../utils/ui";
import { userStore } from "./UserStore";

class TeamStore {
  allTeams: Team[] = [];

  constructor() {
    makeObservable(this, {
      allTeams: observable,
      getAll: action,
      getTeamMembersForTeam: action,
      updateTeamsFromWebSocket: action,
    });

    reaction(
      () => userStore.isSignedIn,
      (isLoggedIn) => {
        if (isLoggedIn) {
          this.connectWebSockets();
        } else {
          this.disconnectWebSockets();
        }
      }
    );

    if (userStore.isSignedIn) {
      this.connectWebSockets();
    }
  }

  connectWebSockets = () => {
    WebSocketService.connect("team");
    WebSocketService.on("team", "ADD", this.handleWebSocketMessage);
    WebSocketService.on("team", "UPDATE", this.handleWebSocketMessage);
    WebSocketService.on("team", "DELETE", this.handleWebSocketMessage);
  };

  disconnectWebSockets = () => {
    WebSocketService.disconnect("team");
    WebSocketService.off("team", "ADD");
    WebSocketService.off("team", "UPDATE");
    WebSocketService.off("team", "DELETE");
  };

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

  updateTeamsFromWebSocket = (message: any) => {
    const { action, team, teamId } = message;
    switch (action) {
      case "ADD":
        this.allTeams = this.allTeams.concat(team);
        break;
      case "UPDATE":
        this.allTeams = this.allTeams.map((t) => (t.id === team.id ? team : t));
        break;
      case "DELETE":
        this.allTeams = this.allTeams.filter((t) => t.id !== teamId);
        break;
      default:
        break;
    }
  };

  handleWebSocketMessage = (message: any) => {
    this.updateTeamsFromWebSocket(message);
  };
}

export const teamStore = new TeamStore();
