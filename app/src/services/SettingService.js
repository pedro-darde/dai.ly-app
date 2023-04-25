import axiosPlugin from "@/lib/axios";
import { BaseService } from "./BaseService";

export class SettingService extends BaseService {
  async list() {
    return this.__cached("list_settings", async () => {
      const res = await axiosPlugin.get("setting");
      return res?.data;
    });
  }
}
export const settingService = new SettingService("setting");
