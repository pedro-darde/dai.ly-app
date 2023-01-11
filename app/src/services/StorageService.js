import { format } from "date-fns";
import {DATE_TIME_INPUT_FORMAT} from "@/constants/Formats";
import {toHtmlDateTimeFormat} from "@/helpers/DateFormatter";
class StorageService {
  CURRENT_NOTE_KEY = "current_note";
  CURRENT_TASK_KEY = "current_task";

  DEFAULT_NOTE_VALUE = {
    description: "",
    fixed: false,
    tasks: []
  };

  DEFAULT_TASK_VALUE = {
    title: "",
    about: "",
    expectedTime: null,
    startAt: toHtmlDateTimeFormat(new Date()),
    status: "0",
  };

  getCurrentNote() {
    const currentNote = this.getStorageValue(this.CURRENT_NOTE_KEY);
    if (currentNote) return currentNote;
    this.setStorageValue(this.CURRENT_NOTE_KEY, this.DEFAULT_NOTE_VALUE);
    return this.DEFAULT_NOTE_VALUE;
  }

  getCurrentTask() {
    const currentTask = this.getStorageValue(this.CURRENT_TASK_KEY);
    if (currentTask) return currentTask;
    this.setStorageValue(this.CURRENT_TASK_KEY, this.DEFAULT_TASK_VALUE);
    return this.DEFAULT_TASK_VALUE;
  }

  getStorageValue(key) {
    if (localStorage[key]) return JSON.parse(localStorage[key]);
    return false;
  }

  setStorageValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const storageService = new StorageService();
