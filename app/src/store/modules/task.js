import { Toast } from "@/lib/sweetalert";
import { storageService } from "@/services/StorageService";
import { taskService } from "@/services/TaskService";

const state = {
  tasks: [],
  currentTask: {},
};

const actions = {
  setCurrentTask({ commit }, newValue = null) {
    if (!newValue) {
      newValue = storageService.getCurrentTask();
    }
    commit("SET_CURRENT_TASK", newValue);
  },
  async saveTask(
    { commit },
    { title, about, status, startAt, expectedDate, expectedTime }
  ) {
    let message = "Task salva com sucesso";
    let icon = "success";
    try {
      await taskService.save({
        title,
        about,
        status,
        startAt,
        expectedDate,
        expectedTime,
      });
    } catch (err) {
      message = err.response.data?.message;
      icon = "error";
    } finally {
      commit("TASK_SAVED", { icon, message });
      if (icon === "success") {
        commit("SET_CURRENT_TASK", storageService.DEFAULT_TASK_VALUE);
      }
    }
  },
  async getTasks({ commit }) {
    const tasks = await taskService.list();
    commit("SET_TASKS", tasks);
  },
};

const getters = {
  taskGetter(state) {
    return state.currentTask;
  },
  tasksGetter(state) {
    return state.tasks;
  },
};

const mutations = {
  SET_CURRENT_TASK(state, value) {
    state.currentTask = value;
    storageService.setStorageValue(storageService.CURRENT_TASK_KEY, value);
  },
  TASK_SAVED(state, { icon, message }) {
    Toast.fire({
      icon,
      text: message,
    });
  },
  SET_TASKS(state, value) {
    state.tasks = value;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
