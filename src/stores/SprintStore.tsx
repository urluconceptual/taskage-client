import axios, { AxiosError } from "axios";
import { makeObservable, observable, action } from "mobx";
import { SPRINTS_API_URL } from "../models/consts";
import { message } from "antd";
import { handleAxiosError } from "../utils/ErrorHandler";

export interface Task {
  id: number;
  title: string;
  description: string;
  statusId: number;
  estimation: number;
  progress: number;
  priorityId: number;
  assigneeId: number;
}

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
  }

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
}

export const sprintStore = new SprintStore();
