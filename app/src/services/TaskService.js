import axiosPlugin from "@/lib/axios";
import {BaseService} from "@/services/BaseService";

class TaskService extends BaseService {
    async markAsDone(id, data) {
        await axiosPlugin.put(`/validateTask/${id}`, data)
    }

    async getRejectedAndValidated() {
        const {data} = await axiosPlugin.get("/validatedAndRejected")
        return data
    }

    async activeTasks() {
        const { data } = await axiosPlugin.get("/activeTasks")
        return data
    }
}

export const taskService = new TaskService("task");
