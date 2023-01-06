import axiosPlugin from "@/lib/axios";

class TaskService {
  async save({ title, about, status, startAt, expectedDate, expectedTime }) {
    await axiosPlugin.post("/task", {
      title,
      about,
      status,
      startAt,
      expectedDate,
      expectedTime,
    });
  }
  async list() {
    const { data } = await axiosPlugin.get("/task");
    return data;
  }
}

export const taskService = new TaskService();
