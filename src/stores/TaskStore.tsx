import axios, { AxiosError } from "axios";
import { makeObservable, observable, action, computed } from "mobx";
import { TASKS_API_URL } from "../models/consts";
import { sprintStore } from "./SprintStore";
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

class TaskStore {
  constructor() {
    makeObservable(this, {
      create: action,
    });
  }

  create = (newTask: Task, teamId: number) => {
    console.log(newTask, teamId)
    axios
      .post(`${TASKS_API_URL}/create`, newTask)
      .then(() => {
        sprintStore.getAllForTeam(teamId);
        message.success("Task added successfully");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };
}

export const taskStore = new TaskStore();
