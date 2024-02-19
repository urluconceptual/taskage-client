import {
  makeObservable,
  observable,
  action,
  runInAction,
  computed,
} from "mobx";
import axios from "axios";
import { USERS_API_URL } from "../models/consts";
import { message } from "antd";

export interface LogInRequestObj {
  username?: string;
  password?: string;
}

class UsersStore {
  token: string = "";

  constructor() {
    makeObservable(this, {
      token: observable,
      logIn: action,
    });
  }

  logIn = (logInRequestObj: LogInRequestObj) => {
    axios
      .post(`${USERS_API_URL}/login`, logInRequestObj)
      .then((res) => {
        switch (res.status) {
          case 200:
            console.log(res.data["token"]);
            this.token = res.data["token"];
            message.success("Logged in successfully.");
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
}

export const userStore = new UsersStore();
