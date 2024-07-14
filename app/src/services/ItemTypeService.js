import axiosPlugin from "@/lib/axios";
import { BaseService } from "./BaseService";

class ItemTypeService extends BaseService {
  constructor() {
    super("itemType");
  }

  async getTypes() {
    return this.__cached("itemType", async () => {
      const res = await axiosPlugin.get("/itemType");
      return res?.data;
    });
  }

  async saveMany(items) {
    return await axiosPlugin.post("itemType/saveMany", {
      items,
    });
  }
}

export const itemTypeService = new ItemTypeService();
