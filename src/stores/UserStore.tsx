import { makeObservable, observable, action } from "mobx";
import axios from "axios";
import { USERS_API_URL } from "../models/consts";
import { message } from "antd";

export interface LogInRequestObj {
  username?: string;
  password?: string;
}

export interface CurrentUser {
  token: string;
  role: string;
}

export interface JobTitle {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  teamLeadId: number;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  authRole: string;
  jobTitle: JobTitle;
  team: Team;
}

class UserStore {
  currentUser: CurrentUser = {
    token: "",
    role: "admin",
  };
  allUsers: User[] = [];

  constructor() {
    makeObservable(this, {
      currentUser: observable,
      allUsers: observable,
      logIn: action,
      getAll: action,
    });
  }

  logIn = async (logInRequestObj: LogInRequestObj) => {
    const instance = axios.create();
    delete instance.defaults.headers.common["Authorization"];
    await instance
      .post(`${USERS_API_URL}/login`, logInRequestObj)
      .then((res) => {
        switch (res.status) {
          case 200:
            this.currentUser.token = res.data["token"];
            localStorage.setItem("access_token", this.currentUser.token);
            axios.defaults.headers.common["Authorization"] =
              `Bearer ${this.currentUser.token}`;
            message.success(`Authenticated as ${logInRequestObj.username}.`);
            break;
          case 400:
            message.error("Bad request. Contact your admin.");
            break;
          case 401:
          case 404:
            message.error("Incorrect username or password.");
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

  getAll = () => {
    axios
      .get(`${USERS_API_URL}/getAll`)
      .then((res) => {
        switch (res.status) {
          case 200:
            this.allUsers = res.data;
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

export const userStore = new UserStore();
