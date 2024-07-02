import { message } from "antd";
import axios, { AxiosError } from "axios";
import { action, makeObservable, reaction } from "mobx";
import { Task } from "../models/Task";
import WebSocketService from "../utils/WebSocketService";
import { ASSIGNMENT_API_URL, TASKS_API_URL } from "../utils/consts";
import { handleAxiosError } from "../utils/ui";
import { sprintStore } from "./SprintStore";
import { userStore } from "./UserStore";
import { CurrentUser } from "../models/User";

class TaskStore {
  constructor() {
    makeObservable(this, {
      create: action,
      update: action,
      updateTasksFromWebSocket: action,
      findBestOption: action,
    });

    reaction(
      () => userStore.isSignedIn,
      (isLoggedIn) => {
        if (isLoggedIn) {
          this.connectWebSocket();
        } else {
          this.disconnectWebSocket();
        }
      }
    );

    if (userStore.isSignedIn) {
      this.connectWebSocket();
    }
  }

  connectWebSocket = () => {
    WebSocketService.connect("task");
  };

  disconnectWebSocket = () => {
    WebSocketService.disconnect("task");
    WebSocketService.off("tasks", "TASK_ADD");
    WebSocketService.off("tasks", "TASK_UPDATE");
    WebSocketService.off("tasks", "TASK_DELETE");
  };

  create = (newTask: Task, teamId: number) => {
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

  update = (task: Task, teamId: number) => {
    axios
      .post(`${TASKS_API_URL}/update`, task)
      .then(() => {
        sprintStore.getAllForTeam(teamId);
        message.success("Task updated successfully");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  delete = (taskId: number, teamId: number) => {
    axios
      .delete(`${TASKS_API_URL}/delete/${taskId}`)
      .then(() => {
        sprintStore.getAllForTeam(teamId);
        message.success("Task deleted successfully");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  findBestOption = async (
    priorityId: number,
    sprintId: number,
    effortPoints: number,
    taskType: number
  ): Promise<number> => {
    var storedUser: CurrentUser = JSON.parse(
      localStorage.getItem("authenticated_user")!
    );
    delete axios.defaults.headers.common["Authorization"];
    return await axios
      .get(
        `${ASSIGNMENT_API_URL}?priority_id=${priorityId}&effort_points=${effortPoints}&type=${taskType}&sprint_id=${sprintId}`
      )
      .then((res) => {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${storedUser!.token}`;
        return res.data;
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${storedUser!.token}`;
      });
  };

  updateTasksFromWebSocket = (message: any) => {
    const { action, task, taskId } = message;
  };

  handleWebSocketMessage = (message: any) => {
    this.updateTasksFromWebSocket(message);
  };
}

export const taskStore = new TaskStore();
