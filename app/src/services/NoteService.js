import axiosPlugin from "@/lib/axios";
import {BaseService} from "@/services/BaseService";

export class NoteService extends BaseService {
    constructor() {
        super("note");
    }
    async latests() {
        const res = await axiosPlugin.get("/latests");
        return res.data || [];
    }
}
export const noteService = new NoteService();
