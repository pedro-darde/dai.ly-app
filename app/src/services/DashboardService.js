import axiosPlugin from "@/lib/axios";
import { BaseService } from "./BaseService";

class DashboardService extends BaseService {
  async getAllData(year) {
    return this.__cached(`DASHBOARD_DATA_${year}`, async () => {
      const res = await axiosPlugin.get(`/dashboard/${year}`);
      return res?.data;
    });
  }
}

export const dashboardService = new DashboardService("dashboard");
