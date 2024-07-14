import axiosPlugin from "@/lib/axios";
import { BaseService } from "./BaseService";

export class PlanningService extends BaseService {
  async get(year) {
    const res = await axiosPlugin.get(`/planning/${year}`);
    return res?.data;
  }

  async getMonths() {
    return this.__cached("months", async () => {
      const res = await axiosPlugin.get("months");
      return res?.data;
    });
  }

  async createInstallmens(year, installments) {
    const res = await axiosPlugin.post(
      `/planning/${year}/installments`,
      installments
    );
    console.log(res);
  }

  async removeItem(year, idItem) {
    const res = await axiosPlugin.delete(`/planning/${year}/item/${idItem}`);
    console.log(res);
  }
  async createItem(payload) {
    const res = await axiosPlugin.post(
      `/planning/${payload.year}/item`,
      payload
    );
    console.log(res);
  }
  async updateItem({ year, item }) {
    const res = await axiosPlugin.put(`/planning/${year}/item/${item.id}`, {
      item,
    });
    console.log(res);
  }
}

export const planningService = new PlanningService("planning");
