import axiosPlugin from "@/lib/axios";
import { BaseService } from "./BaseService";

export class PlanningService extends BaseService {
    async get(year) {
        console.log(year)
        return this.__cached(`planning_${year}`, async () => {
            const res = await axiosPlugin.get(`/planning/${year}`);
            return res?.data;
        });
    }
}

export const planningService = new PlanningService("planning")