import axios, { AxiosError } from "axios";
import { makeObservable, observable, action, computed } from "mobx";
import { SPRINTS_API_URL } from "../models/consts";
import { message } from "antd";
import { handleAxiosError } from "../utils/ErrorHandler";
import { formatDate } from "../models/ui";
import { Task } from "./TaskStore";

export interface Sprint {
  id: number;
  startDate: string;
  endDate: string;
  tasks: Task[];
}

export interface SprintCreateRequest extends Omit<Sprint, "id" | "tasks"> {
  teamId: number;
}

class SprintStore {
  allSprints: Sprint[] = [];
  constructor() {
    makeObservable(this, {
      allSprints: observable,
      getAllForTeam: action,
      create: action,
      sprintsAsDatasource: computed
    });
  }

  create = (sprint: SprintCreateRequest) => {
    axios
      .post(`${SPRINTS_API_URL}/create`, sprint)
      .then(() => {
        this.getAllForTeam(sprint.teamId);
        message.success("Sprint created successfully");
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
