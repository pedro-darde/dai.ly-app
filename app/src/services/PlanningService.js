import axiosPlugin from "@/lib/axios";
import { BaseService } from "./BaseService";

export class PlanningService extends BaseService {
  async get(year) {
    return this.__cached(`planning_${year}`, async () => {
      const res = await axiosPlugin.get(`/planning/${year}`);
      return res?.data;
    });
  }

  async getMonths() {
    return this.__cached("months", async () => {
      const res = await axiosPlugin.get("months");
      return res?.data;
    });
  }
}

export const planningService = new PlanningService("planning");
