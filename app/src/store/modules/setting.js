import quickid from "@/helpers/quickid";
import { settingService } from "@/services/SettingService";

export const makeDefaultSetting = (id = quickid()) => ({
  id,
  key: null,
  value: null,
  valueType: null,
  allowEditKey: true,
  allowRemove: true,
});

const state = {
  settings: [makeDefaultSetting()],
};
const actions = {
  async getSettings({ commit }) {
    try {
      const settings = await settingService.list();
      if (settings) commit("SET_SETTINGS", settings);
    } catch (e) {}
  },
  applyCurrentSettings({ commit }, value) {
    commit("SET_SETTINGS", value);
  },
};
const mutations = {
  SET_SETTINGS(state, value) {
    state.settings = value;
  },
};

export default {
  state,
  actions,
  mutations,
  namespaced: true,
};
