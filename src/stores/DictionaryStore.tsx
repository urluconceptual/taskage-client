import axios from "axios";
import { makeObservable, observable, action } from "mobx";
import { DICTIONARIES_API_URL } from "../models/consts";

class DictionaryStore {
  statusDictionary : {[key : number] : string} = {};
  priorityDictionary : {[key : number] : string} = {};

  constructor() {
    makeObservable(this, {
      statusDictionary: observable,
      priorityDictionary: observable,
      getStatusDictionary: action,
      getPriorityDictionary: action,
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
}

export const dictionaryStore = new DictionaryStore();
