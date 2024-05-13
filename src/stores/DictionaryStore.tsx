import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { DICTIONARIES_API_URL } from "../utils/consts";

class DictionaryStore {
  statusDictionary: { [key: number]: string } = {};
  priorityDictionary: { [key: number]: string } = {};

  constructor() {
    makeObservable(this, {
      statusDictionary: observable,
      priorityDictionary: observable,
      getStatusDictionary: action,
      getPriorityDictionary: action,
      priorityAsDatasource: computed,
      statusAsDatasource: computed,
    });
  }

  getStatusDictionary = () => {
    axios.get(`${DICTIONARIES_API_URL}/getStatuses`).then((res) => {
      this.statusDictionary = res.data;
    });
  };

  getPriorityDictionary = () => {
    axios.get(`${DICTIONARIES_API_URL}/getPriorities`).then((res) => {
      this.priorityDictionary = res.data;
    });
  };

  get priorityAsDatasource() {
    return Object.entries(this.priorityDictionary).map(([key, value]) => {
      return {
        value: key,
        label: value,
      };
    });
  }

  get statusAsDatasource() {
    return Object.entries(this.statusDictionary).map(([key, value]) => {
      return {
        value: key,
        label: value,
      };
    });
  }
}

export const dictionaryStore = new DictionaryStore();
