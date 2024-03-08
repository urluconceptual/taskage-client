import { makeObservable, observable } from "mobx";
import { JOBTITLES_API_URL } from "../models/consts";
import axios from "axios";
import { message } from "antd";

export interface JobTitle {
  id: number;
  name: string;
}

class JobTitleStore {
  allJobTitles: JobTitle[] = [];

  constructor() {
    makeObservable(this, {
      allJobTitles: observable,
    });
  }

  getAll = () => {
    axios
      .get(`${JOBTITLES_API_URL}/getAll`)
      .then((res) => {
        switch (res.status) {
          case 200:
            this.allJobTitles = res.data;
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
  };
}

export const jobTitleStore = new JobTitleStore();
