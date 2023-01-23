import { planningService } from "@/services/PlanningService";

const state = {
  planning: null,
  months: [],
};

const actions = {
  createPlanning({ commit }, payload) {},
  async changePlanningYear({ commit }, year) {
    try {
      const planning = await planningService.get(year);
      commit("SET_PLANNING", planning);
    } catch (e) {
      console.log(e);
    }
  },
  saveMonths({ commit }, months) {},
  async getMonths({ commit }) {
    try {
      const months = await planningService.getMonths();
      commit("SET_MONTHS", months);
    } catch (e) {
      console.error(e);
    }
  },
};

const mutations = {
  SET_PLANNING(state, planning) {
    state.planning = planning;
  },
  SET_MONTHS(state, months) {
    state.months = months;
  },
};

const getters = {
    monthGetter(state) {
        return state.months
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
