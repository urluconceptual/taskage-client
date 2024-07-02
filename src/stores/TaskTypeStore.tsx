import axios, { AxiosError } from "axios";
import { computed, makeObservable, observable } from "mobx";
import { TaskType } from "../models/TaskType";
import { TASKTYPES_API_URL } from "../utils/consts";
import { handleAxiosError } from "../utils/ui";

class TaskTypeStore {
  allTaskTypes: TaskType[] = [];

  constructor() {
    makeObservable(this, {
      allTaskTypes: observable,
      taskTypeAsDictionary: computed,
    });
  }

  getAll = () => {
    axios
      .get(`${TASKTYPES_API_URL}/getAll`)
      .then((res) => {
        this.allTaskTypes = res.data;
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  get taskTypeAsDictionary() {
    return this.allTaskTypes.reduce(
      (acc, taskType) => {
        acc[taskType.id!] = taskType.name;
        return acc;
      },
      {} as { [key: number]: string }
    );
  }
}

export const taskTypeStore = new TaskTypeStore();
