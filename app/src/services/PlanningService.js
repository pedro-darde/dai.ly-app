import { BaseService } from "./BaseService";

export class PlanningService extends BaseService {
    async get(year) {
        return this.__cached(`planning_${year}`, async () => {
            const res = await axios.get(`/planning/${year}`);
            return res?.data;
        });
    }
}

export const planningService = new PlanningService("planning")