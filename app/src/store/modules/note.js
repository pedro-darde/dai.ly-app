import { noteService } from "@/services/NoteService";
import { storageService } from "@/services/StorageService";

const state = {
  notes: [],
  currentNote: {},
  showToast: false,
  toastMessage: "",
  toastMessageType: "success",
};

const actions = {
  setCurrentNote({ commit }, newValue = null) {
    if (!newValue) {
      newValue = storageService.getCurrentNote();
    }
    commit("SET_CURRENT_NOTE", newValue);
  },
  async getLatestNotes({ commit }) {
    const notes = await noteService.latests();
    console.log(notes);
    commit("SET_ALL_NOTES", notes);
  },
  async saveNote({ commit }, { description, fixed }) {
    let message = "Nota salva com sucesso";
    let success = true;
    try {
      await noteService.save({ description, fixed });
    } catch (err) {
      message = err.response.data?.name;
      success = false;
    } finally {
      commit("NOTE_SAVED", { message, success });
      if (success) {
        commit("SET_CURRENT_NOTE", storageService.DEFAULT_NOTE_VALUE);
      }
      setTimeout(() => {
        commit("CLEAR_TOAST_OPTIONS");
      }, 2500);
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
  toastMessageGetter(state) {
    return state.toastMessage;
  },
  showToastGetter(state) {
    return state.showToast;
  },
  toastMessageTypeGetter(state) {
    return state.toastMessageType;
  },
};

const mutations = {
  SET_CURRENT_NOTE(state, value) {
    state.currentNote = value;
    storageService.setStorageValue(storageService.CURRENT_NOTE_KEY, value);
  },
  SET_ALL_NOTES(state, value) {
    state.notes = value;
  },
  NOTE_SAVED(state, { success, message }) {
    if (!success) state.toastMessageType = "error";
    state.showToast = true;
    state.toastMessage = message;
  },
  CLEAR_TOAST_OPTIONS(state) {
    state.showToast = false;
    state.toastMessage = "";
    state.toastMessageType = "success";
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
