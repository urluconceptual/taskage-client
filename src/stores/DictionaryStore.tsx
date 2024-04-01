import axios from "axios";
import { makeObservable, observable, action, computed } from "mobx";
import { DICTIONARIES_API_URL } from "../models/consts";

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
}

export const dictionaryStore = new DictionaryStore();
