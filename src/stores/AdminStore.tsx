import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { ADMIN_API_URL } from "../utils/consts";

export interface UserActivityLog {
  userId: number;
  level: string;
  activity: string;
  timestamp: string;
}

class AdminStore {
  userActivities: UserActivityLog[] = [];
  loading = false;

  constructor() {
    makeObservable(this, {
      getUserActivity: action,
      loading: observable,
      userActivities: observable,
      errorCount: computed,
      infoCount: computed,
      totalActivities: computed,
    });
  }

  getUserActivity = () => {
    this.loading = true;
    axios.get(`${ADMIN_API_URL}/userActivity`).then((res) => {
      this.userActivities = res.data;
      this.loading = false;
    });
  };

  get errorCount() {
    return this.userActivities.filter((activity) => activity.level === "ERROR")
      .length;
  }

  get infoCount() {
    return this.userActivities.filter((activity) => activity.level === "INFO")
      .length;
  }

  get totalActivities() {
    return this.userActivities.length;
  }
}

export const adminStore = new AdminStore();
