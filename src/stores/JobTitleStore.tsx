import { makeObservable, observable } from "mobx";
import { JOBTITLES_API_URL } from "../models/consts";
import axios, { AxiosError } from "axios";
import { handleAxiosError } from "../utils/ErrorHandler";

export interface JobTitle {
  id?: number | null;
  name?: string | null;
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
        this.allJobTitles = res.data;
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };
}

export const jobTitleStore = new JobTitleStore();
