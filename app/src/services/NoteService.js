import axiosPlugin from "@/lib/axios";
import Cached from "./Cached";
import {BaseService} from "@/services/BaseService";

export class NoteService extends BaseService{
    async latests() {
        const res = await axiosPlugin.get("/latests");
        return res.data || [];
    }
}

export const noteService = new NoteService("note");
