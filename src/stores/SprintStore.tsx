import axios from "axios";
import { makeObservable, observable, action } from "mobx";
import { SPRINTS_API_URL } from "../models/consts";
import { message } from "antd";

export interface Sprint {
  id: number;
  startDate: string;
  endDate: string;
}

class SprintStore {
  allSprints : Sprint[] = [];
  constructor() {
    makeObservable(this, {
      allSprints: observable,
      getAllForTeam: action
    });
  }

  getAllForTeam = (teamId: number) => {
    axios
    .get(`${SPRINTS_API_URL}/getAllForTeam/${teamId}`)
    .then((res) => {
      switch (res.status) {
        case 200:
          this.allSprints = res.data;
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
  }

}

export const sprintStore = new SprintStore();
