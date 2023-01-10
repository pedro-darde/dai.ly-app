import {Toast} from "@/lib/sweetalert";
import {storageService} from "@/services/StorageService";
import {taskService} from "@/services/TaskService";
import {toHtmlDateTimeFormat} from "@/helpers/DateFormatter";

const state = {
    activeTasks: [],
    rejectedAndValidated: [],
    currentTask: {},
    allTasks: []
};

const actions = {
    setCurrentTask({commit}, newValue = null) {
        if (!newValue) {
            newValue = storageService.getCurrentTask();
        }
        commit("SET_CURRENT_TASK", newValue);
    },
    async saveTask(
        {commit},
        {title, about, status, startAt, expectedDate, expectedTime}
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
            commit("TASK_SAVED", {icon, message});
            if (icon === "success") {
                commit("SET_CURRENT_TASK", storageService.DEFAULT_TASK_VALUE);
            }
        }
    },
    async getAllTasks({commit}) {
        const tasks = await taskService.list();
        for (const task of tasks) {
            if (task.startAt) task.startAt = toHtmlDateTimeFormat(task.startAt)
            if (task.endAt) task.endAt = toHtmlDateTimeFormat(task.endAt)
            if (task.expectedDate) task.expectedDate = toHtmlDateTimeFormat(task.expectedDate)
        }
        commit("SET_ALL_TASKS", tasks);
    },
    async editTask({commit}, task) {
        let message = "Task editada com sucesso"
        let icon = "success"

        try {
            await taskService.edit(task.id, task)
        } catch (e) {
            message = "Internal server error"
            if (e.response?.data?.message) message = e.response?.data.message
            icon = "error"
        } finally {
            commit("TASK_SAVED", {icon, message})
        }
    },
    async removeTask({commit}, {id, hasNotes}) {
        let message = "Task removida com sucesso"
        let icon = "success"
        try {
            await taskService.delete(id, hasNotes)
        } catch (e) {
            icon = "error"
            message = "Internal server error"
            if (e.response?.data?.message) message = e.response.data.message
        } finally {
            commit("TASK_SAVED", {icon, message})
        }
    },
    async markAsDone({commit}, task) {
        let icon = "success"
        let message = "Task finalizada"
        try {
            await taskService.markAsDone(task.id, task)
        } catch (e) {
            message = "Internal server error"
            if (e.response?.data?.message) message = e.response?.data.message
            icon = "error"
        } finally {
            commit("TASK_SAVED", {icon, message})
        }
    },
    async getRejectedAndValidated({commit}) {
        const tasks = await taskService.getRejectedAndValidated()
        commit("SET_REJECTED_AND_VALIDATE", tasks)
    },
    async getActiveTasks({commit}) {
        const activeTasks = await taskService.activeTasks();
        commit("SET_ACTIVE_TASKS", activeTasks)
    }
};

const getters = {
    taskGetter(state) {
        return state.currentTask;
    },
    activeTasksGetter(state) {
        return state.activeTasks;
    },
    tasksRejectedAndValidatedGetter() {
        return state.rejectedAndValidated
    },
    allTasksGetter(state) {
        return state.allTasks
    }
};

const mutations = {
    SET_CURRENT_TASK(state, value) {
        state.currentTask = value;
        storageService.setStorageValue(storageService.CURRENT_TASK_KEY, value);
    },
    TASK_SAVED(state, {icon, message}) {
        Toast.fire({
            icon,
            text: message,
        });
    },
    SET_ACTIVE_TASKS(state, value) {
        state.activeTasks = value;
    },
    SET_REJECTED_AND_VALIDATE(state, value) {
        state.rejectedAndValidated = value
    },
    SET_ALL_TASKS(state, value) {
        state.allTasks = value
    }
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
