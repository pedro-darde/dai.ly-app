import axiosPlugin from "@/lib/axios";
import Cached from "./Cached";

export class NoteService extends Cached {
  async latests() {
    const res = await axiosPlugin.get("/latests");
    return res.data || [];
  }

  async save({ description, fixed }) {
    await axiosPlugin.post("/note", { description, fixed });
  }
}

export const noteService = new NoteService();
