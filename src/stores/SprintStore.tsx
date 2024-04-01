import { message } from "antd";
import axios, { AxiosError } from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { Sprint, SprintCreateRequest } from "../models/Sprint";
import { SPRINTS_API_URL } from "../utils/consts";
import { formatDate, handleAxiosError } from "../utils/ui";

class SprintStore {
  allSprints: Sprint[] = [];
  constructor() {
    makeObservable(this, {
      allSprints: observable,
      getAllForTeam: action,
      create: action,
      sprintsAsDatasource: computed,
    });
  }

  create = (sprint: SprintCreateRequest) => {
    axios
      .post(`${SPRINTS_API_URL}/create`, sprint)
      .then(() => {
        this.getAllForTeam(sprint.teamId);
        message.success("Sprint created successfully.");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  getAllForTeam = (teamId: number) => {
    axios
      .get(`${SPRINTS_API_URL}/getAllForTeam/${teamId}`)
      .then((res) => {
        this.allSprints = res.data;
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  get sprintsAsDatasource() {
    return this.allSprints.map((sprint) => ({
      value: sprint.id,
      label: `Sprint ${formatDate(sprint?.startDate)} - ${formatDate(sprint?.endDate)}`,
    }));
  }
}

export const sprintStore = new SprintStore();
