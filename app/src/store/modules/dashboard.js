import { dashboardService } from "@/services/DashboardService";

const state = {
  inAndOutTypes: [],
  reducedMonthValues: [],
  stackedMonthWithItems: [],
  outWithItems: [],
};

const actions = {
  async getAll({ commit }, year) {
    try {
      const {
        inAndOutTypes,
        reducedMonthValues,
        stackedMonthWithItems,
        outWithItems,
      } = await dashboardService.getAllData(year);
      commit("SET_IN_AND_OUT_TYPES", inAndOutTypes ?? []);
      commit("SET_REDUCED_MONTH_VALUES", reducedMonthValues ?? []);
      commit("SET_STACKED_MONTH_WITH_ITEMS", stackedMonthWithItems ?? []);
      commit("SET_OUT_WITH_ITEMS", outWithItems ?? []);
    } catch (e) {
      console.error("deu pau pegand os dados do dashboard");
    }
  },
};

const mutations = {
  SET_IN_AND_OUT_TYPES(state, value) {
    state.inAndOutTypes = value;
  },
  SET_REDUCED_MONTH_VALUES(state, value) {
    state.reducedMonthValues = value;
  },
  SET_STACKED_MONTH_WITH_ITEMS(state, value) {
    state.stackedMonthWithItems = value;
  },
  SET_OUT_WITH_ITEMS(state, value) {
    state.outWithItems = value;
  },
};

const getters = {};

export default { namespaced: true, state, actions, mutations, getters };
