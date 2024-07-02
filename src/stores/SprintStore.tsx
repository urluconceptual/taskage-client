import { message } from "antd";
import axios, { AxiosError } from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { Sprint, SprintCreateRequest } from "../models/Sprint";
import { SPRINTS_API_URL } from "../utils/consts";
import { formatDate, handleAxiosError } from "../utils/ui";
import { userStore } from "./UserStore";

class SprintStore {
  allSprints: Sprint[] = [];
  constructor() {
    makeObservable(this, {
      allSprints: observable,
      getAllForTeam: action,
      create: action,
      sprintsAsDatasource: computed,
      sprintsAsDictionary: computed,
      sprintDataForCurrentUser: computed,
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

  get sprintsAsLabels() {
    return this.allSprints.reduce((acc: { [key: number]: string }, sprint) => {
      acc[sprint.id] =
        `${formatDate(sprint?.startDate)} - ${formatDate(sprint?.endDate)}`;
      return acc;
    }, {});
  }

  get sprintsAsDictionary() {
    return this.allSprints.reduce((acc: { [key: number]: Sprint }, sprint) => {
      acc[sprint.id] = sprint;
      return acc;
    }, {});
  }

  get sprintDataForCurrentUser() {
    return this.allSprints
      .map((sprint) => {
        return {
          id: sprint.id,
          sprintEndDate: formatDate(sprint.endDate),
          sprintStartDate: formatDate(sprint.startDate),
          effortPoints: sprint.tasks
            .filter(
              (task) => task.assigneeId === userStore.currentUser?.user.id
            )
            .map((task) => task.estimation)
            .reduce((acc, curr) => acc + curr, 0),
        };
      })
      .sort(
        (a, b) =>
          new Date(b.sprintEndDate).getTime() -
          new Date(a.sprintEndDate).getTime()
      );
  }
}

export const sprintStore = new SprintStore();
