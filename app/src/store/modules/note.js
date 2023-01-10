import {Toast} from "@/lib/sweetalert";
import {noteService} from "@/services/NoteService";
import {storageService} from "@/services/StorageService";

const state = {
    notes: [],
    currentNote: {},
    allNotes: []
};

const actions = {
    setCurrentNote({commit}, newValue = null) {
        if (!newValue) {
            newValue = storageService.getCurrentNote();
        }
        commit("SET_CURRENT_NOTE", newValue);
    },
    async getLatestNotes({commit}) {
        const notes = await noteService.latests();
        commit("SET_LATEST_NOTES", notes);
    },
    async allNotes({commit}) {
        const allNotes = await noteService.list()
        commit("SET_ALL_NOTES", allNotes)
    },
    async saveNote({commit}, {description, fixed, tasks}) {
        let message = "Nota salva com sucesso";
        let icon = "success";
        try {
            await noteService.save({description, fixed, tasks});
        } catch (err) {
            message = err.response.data?.message;
            icon = "error";
        } finally {
            commit("NOTE_SAVED", {icon, message});
            if (icon === "success") {
                commit("SET_CURRENT_NOTE", storageService.DEFAULT_NOTE_VALUE);
            }
        }
    },
    async editNote({commit}, {description, fixed, id, tasks, tasksToInsert, tasksToRemove}) {
        let message = "Nota salva com sucesso";
        let icon = "success";
        try {
            await noteService.edit(id, {description, fixed, tasks, tasksToInsert, tasksToRemove});
        } catch (err) {
            message = err.response.data?.message;
            icon = "error";
        } finally {
            commit("NOTE_SAVED", {icon, message});
        }
    },
    async removeNote({commit}, id) {
        let icon = "success";
        let message = "Nota removida com sucesso";
        try {
            await noteService.delete(id);
        } catch (err) {
            message = err.response.data?.name;
            icon = "error";
        } finally {
            commit("REMOVE_NOTE", {icon, message});
        }
    },
};

const getters = {
    noteGetter(state) {
        return state.currentNote;
    },
    notesGetter(state) {
        return state.notes;
    },
    allNotesGetter(state) {
        return state.allNotes
    }
};

const mutations = {
    SET_CURRENT_NOTE(state, value) {
        state.currentNote = value;
        storageService.setStorageValue(storageService.CURRENT_NOTE_KEY, value);
    },
    SET_LATEST_NOTES(state, value) {
        state.notes = value;
    },
    NOTE_SAVED(state, {icon, message}) {
        Toast.fire({
            icon,
            text: message,
        });
    },
    SET_ALL_NOTES(state, notes) {
        state.allNotes = notes
    },
    REMOVE_NOTE(state, {icon, message}) {
        Toast.fire({
            icon,
            text: message,
        });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
