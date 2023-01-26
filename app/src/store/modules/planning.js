import { toHtmlDateTimeFormat } from "@/helpers/DateFormatter";
import quickid from "@/helpers/quickid";
import { Toast } from "@/lib/sweetalert";
import { planningService } from "@/services/PlanningService";

const state = {
  planning: {
    year: new Date().getFullYear(),
    title: "",
    expectedAmount: 0,
    planningStart: toHtmlDateTimeFormat(new Date()),
    planningEnd: null,
    planningMonths: [
      {
        id: quickid(),
        expectedAmount: 0,
        idMonth: new Date().getMonth(),
        items: [
          {
            id: quickid(),
            value: 0,
            operation: "out",
            date: toHtmlDateTimeFormat(new Date()),
            paymentMethod: "debit",
            description: ""
          },
        ],
      },
    ],
  },
  months: [],
};

const actions = {
  async createPlanning({ commit }, payload) {
    let message = 'Planning Started'
    let icon = 'success'
    try {
      await planningService.save(payload)
    } catch (e) {
      console.log(e)
      icon = "error"
      message = e.response?.data?.message ?? "Internal Server Error"
    } finally {
      commit("PLANNING_CREATED", { message, icon })
    }
  },
  async changePlanningYear({ commit }, year) {
    try {
      const planning = await planningService.get(year);
      if (planning) commit("SET_PLANNING", planning);
    } catch (e) {
      console.log(e);
    }
  },
  saveMonths({ commit }, months) { },
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
  PLANNING_CREATED(_, { icon, message }) {
    Toast.fire({
      icon,
      text: message,
    });
  }
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
