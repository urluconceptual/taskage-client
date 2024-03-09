import { makeObservable, observable, action, computed } from "mobx";
import axios from "axios";
import { USERS_API_URL } from "../models/consts";
import { message } from "antd";
import { JobTitle } from "./JobTitleStore";

export enum UserDrawerMode {
  EDIT = "edit",
  ADD = "add",
}

export enum UserDrawerButton {
  EDIT = "edit",
  ADD = "add",
}

export interface LogInRequestObj {
  username?: string;
  password?: string;
}

export interface CurrentUser {
  username: string;
  firstName: string;
  lastName: string;
  authRole: string;
  token: string;
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

export interface UserRequestObj {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  authRole: string;
  jobTitle: JobTitle;
}

class UserStore {
  currentUser: CurrentUser | null = null;
  automaticLogInWaiting = false;
  allUsers: User[] = [];

  constructor() {
    makeObservable(this, {
      isSignedIn: computed,
      currentUser: observable,
      userDictionary: computed,
      allUsers: observable,
      logIn: action,
      logOut: action,
      getAll: action,
      automaticLogIn: action,
      automaticLogInWaiting: observable,
    });
  }

  get isSignedIn() {
    return this.currentUser !== null;
  }

  logIn = async (logInRequestObj: LogInRequestObj) => {
    const instance = axios.create();
    delete instance.defaults.headers.common["Authorization"];
    await instance
      .post(`${USERS_API_URL}/login`, logInRequestObj)
      .then((res) => {
        switch (res.status) {
          case 200:
            this.currentUser = res.data;
            localStorage.setItem(
              "authenticated_user",
              JSON.stringify(this.currentUser!),
            );
            axios.defaults.headers.common["Authorization"] =
              `Bearer ${this.currentUser!.token}`;
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

  get userDictionary() {
    const userDictionary: {
      [key: number]: { userData: User; userLabel: string };
    } = {};
    this.allUsers.forEach((user) => {
      userDictionary[user.id] = {
        userData: user,
        userLabel: `${user.firstName} ${user.lastName}(${user.username})`,
      };
    });
    return userDictionary;
  }

  logOut = () => {
    this.currentUser = null;
    localStorage.removeItem("authenticated_user");
    message.success("Logged out.");
  };

  automaticLogIn = async () => {
    this.automaticLogInWaiting = true;
    var automaticLogInSuccess = false;
    if (localStorage.getItem("authenticated_user")) {
      var storedUser: CurrentUser = JSON.parse(
        localStorage.getItem("authenticated_user")!,
      );
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${storedUser!.token}`;
      try {
        var res = await axios.get(`${USERS_API_URL}/checkLocalCredentials`);
        if (res.status === 200) {
          message.success(`Automatically authenticated!`);
          this.currentUser = storedUser;
          automaticLogInSuccess = true;
        } else {
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem("authenticated_user");
          message.error("Session expired. Please log in.");
        }
      } catch (err) {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("authenticated_user");
        message.error("Session expired. Please log in.");
      }
    }
    this.automaticLogInWaiting = false;
    return automaticLogInSuccess;
  };

  addNewUser = async (userRequestObj: UserRequestObj) => {
    console.log(userRequestObj);
    await axios
      .post(`${USERS_API_URL}/register`, userRequestObj)
      .then((res) => {
        switch (res.status) {
          case 200:
            message.success("User added.");
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

  updateUser = async (userRequestObj: UserRequestObj) => {
    await axios
      .post(`${USERS_API_URL}/update`, userRequestObj)
      .then((res) => {
        switch (res.status) {
          case 200:
            message.success("User edited.");
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

  deleteUser = async (userId: number) => {
    await axios
      .delete(`${USERS_API_URL}/delete/${userId}`)
      .then((res) => {
        switch (res.status) {
          case 200:
            message.success("User deleted.");
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
