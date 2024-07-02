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
    WebSocketService.on("task", "ADD", this.handleWebSocketMessage);
    WebSocketService.on("task", "UPDATE", this.handleWebSocketMessage);
    WebSocketService.on("task", "DELETE", this.handleWebSocketMessage);
  };

  disconnectWebSocket = () => {
    WebSocketService.disconnect("task");
    WebSocketService.off("task", "ADD");
    WebSocketService.off("task", "UPDATE");
    WebSocketService.off("task", "DELETE");
  };

  create = (newTask: Task) => {
    axios
      .post(`${TASKS_API_URL}/create`, newTask)
      .then(() => {
        message.success("Task added successfully");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  update = (task: Task) => {
    axios
      .post(`${TASKS_API_URL}/update`, task)
      .then(() => {
        message.success("Task updated successfully");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  delete = (taskId: number) => {
    axios
      .delete(`${TASKS_API_URL}/delete/${taskId}`)
      .then(() => {
        message.success("Task deleted successfully");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  findBestOption = async (
    priorityId: number,
    effortPoints: number,
    taskType: number
  ): Promise<number> => {
    var storedUser: CurrentUser = JSON.parse(
      localStorage.getItem("authenticated_user")!
    );
    delete axios.defaults.headers.common["Authorization"];
    return await axios
      .get(
        `${ASSIGNMENT_API_URL}/?priority_id=${priorityId}&effort_points=${effortPoints}&type=${taskType}`
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

  handleWebSocketMessage = (message: any) => {
    const { action, task, taskId } = message;
    switch (action) {
      case "ADD":
        sprintStore.allSprints = sprintStore.allSprints.map((s) =>
          s.id === task.sprintId ? { ...s, tasks: s.tasks.concat(task) } : s
        );
        break;
      case "UPDATE":
        sprintStore.allSprints = sprintStore.allSprints.map((s) =>
          s.id === task.sprintId
            ? { ...s, tasks: s.tasks.map((t) => (t.id === task.id ? task : t)) }
            : s
        );
        break;
      case "DELETE":
        sprintStore.allSprints = sprintStore.allSprints.map((s) =>
          s.tasks.some((t) => t.id === taskId)
            ? { ...s, tasks: s.tasks.filter((t) => t.id !== taskId) }
            : s
        );
        break;
      default:
        break;
    }
  };
}

export const taskStore = new TaskStore();
