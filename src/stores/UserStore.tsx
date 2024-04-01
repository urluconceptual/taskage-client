import { message } from "antd";
import axios, { AxiosError } from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import {
  CurrentUser,
  LogInRequestObj,
  User,
  UserRequestObj,
} from "../models/User";
import { USERS_API_URL } from "../utils/consts";
import { handleAxiosError } from "../utils/ui";

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
      getAllForTeam: action,
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
        this.currentUser = res.data;
        localStorage.setItem(
          "authenticated_user",
          JSON.stringify(this.currentUser!)
        );
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${this.currentUser!.token}`;
        message.success(`Authenticated as ${logInRequestObj.username}.`);
      })
      .catch((err) => {
        handleAxiosError(err);
      });
  };

  getAll = () => {
    axios
      .get(`${USERS_API_URL}/getAll`)
      .then((res) => {
        this.allUsers = res.data;
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
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
        localStorage.getItem("authenticated_user")!
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
    await axios
      .post(`${USERS_API_URL}/register`, userRequestObj)
      .then((res) => {
        message.success("User added.");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  updateUser = async (userRequestObj: UserRequestObj) => {
    await axios
      .post(`${USERS_API_URL}/update`, userRequestObj)
      .then((res) => {
        message.success("User edited.");
      })
      .catch((err: AxiosError) => {
        handleAxiosError(err);
      });
  };

  deleteUser = async (userId: number) => {
    await axios
      .delete(`${USERS_API_URL}/delete/${userId}`)
      .then((res) => {
        message.success("User deleted.");
      })
      .catch((err) => {
        handleAxiosError(err);
      });
  };

  getAllForTeam = (teamId: number) => {
    axios
      .get(`${USERS_API_URL}/getAllForTeam/${teamId}`)
      .then((res) => {
        this.allUsers = res.data;
      })
      .catch((err) => {
        handleAxiosError(err);
      });
  };
}

export const userStore = new UserStore();
