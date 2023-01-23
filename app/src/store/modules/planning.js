import { planningService } from "@/services/PlanningService";

const state = {
  planning: null,
  months: [],
};

const actions = {
 async createPlanning({ commit }, payload) {
    try {
      await planningService.save(payload)
      commit("PLANNING_CREATED")
    } catch (e) {
      console.log(e)
    }
  },
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
    },
    planningGetter(state) {
      return state.planning
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
