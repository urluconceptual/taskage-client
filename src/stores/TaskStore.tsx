import { message } from "antd";
import axios, { AxiosError } from "axios";
import { action, makeObservable } from "mobx";
import { Task } from "../models/Task";
import { TASKS_API_URL } from "../utils/consts";
import { handleAxiosError } from "../utils/ui";
import { sprintStore } from "./SprintStore";

class TaskStore {
  constructor() {
    makeObservable(this, {
      create: action,
    });
  }

  create = (newTask: Task, teamId: number) => {
    console.log(newTask, teamId);
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
