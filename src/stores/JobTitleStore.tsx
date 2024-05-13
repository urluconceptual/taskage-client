import axios, { AxiosError } from "axios";
import { makeObservable, observable } from "mobx";
import { JobTitle } from "../models/JobTitle";
import { JOBTITLES_API_URL } from "../utils/consts";
import { handleAxiosError } from "../utils/ui";

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
        this.allJobTitles = res.data;
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };
}

export const jobTitleStore = new JobTitleStore();
