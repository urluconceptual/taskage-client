import {
  makeObservable,
  observable,
  action
} from "mobx";
import axios from "axios";
import { TEAMS_API_URL } from "../models/consts";
import { message } from "antd";

export interface Team {
  id: number;
  name: string;
  teamLeadId: number;
}

class TeamStore {
  allTeams: Team[] = [];

  constructor() {
    makeObservable(this, {
      allTeams: observable,
      getAll: action,
    });
  }

  getAll = () => {
    axios
      .get(`${TEAMS_API_URL}/getAll`)
      .then((res) => {
        switch (res.status) {
          case 200:
            console.log(res.data["teams"]);
            this.allTeams = res.data["teams"];
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
}

export const teamStore = new TeamStore();
