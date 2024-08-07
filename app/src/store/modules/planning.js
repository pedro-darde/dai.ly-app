import { DATE_INPUT_FORMAT } from "@/constants/Formats";
import { toHtmlDateTimeFormat } from "@/helpers/DateFormatter";
import quickid from "@/helpers/quickid";
import { Toast } from "@/lib/sweetalert";
import { itemTypeService } from "@/services/ItemTypeService";
import { planningService } from "@/services/PlanningService";
import { ccService } from "@/services/CCService";
import { organizeSpents } from "../helpers/planning";
const DEFAULT_PLANNING = {
  id: null,
  year: new Date().getFullYear(),
  title: "Planning of " + new Date().getFullYear(),
  expectedAmount: 0,
  startAt: new Date(),
  planningEnd: null,
  planningMonths: [],
  existingYears: [],
};
const state = {
  planning: DEFAULT_PLANNING,
  months: [],
  itemTypes: [],
  plainItemTypes: [],
  cards: [],
  existingYears: [],
};

const actions = {
  async createPlanning({ commit }, payload) {
    let message = "Planning Started";
    let icon = "success";
    try {
      await planningService.save(payload);
    } catch (e) {
      console.log(e);
      icon = "error";
      message = e.response?.data?.message ?? "Internal Server Error";
    } finally {
      commit("PLANNING_CREATED", { message, icon });
    }
  },
  async createMoviment({ commit }, payload) {
    let message = "Moviment Created";
    let icon = "success";
    try {
      await planningService.createItem(payload);
    } catch (e) {
      console.log(e);
      icon = "error";
      message = e.response?.data?.message ?? "Internal Server Error";
    } finally {
      commit("MOVIMENT_CREATED", { message, icon });
    }
  },
  async updateMoviment({ commit }, payload) {
    let message = "Moviment Edited";
    let icon = "success";
    try {
      await planningService.updateItem(payload);
    } catch (e) {
      console.log(e);
      icon = "error";
      message = e.response?.data?.message ?? "Internal Server Error";
    } finally {
      commit("MOVIMENT_CREATED", { message, icon });
    }
  },
  async changePlanningYear({ commit, state }, year) {
    try {
      let planning = (await planningService.get(year)) || DEFAULT_PLANNING;
      planning.startAt = toHtmlDateTimeFormat(
        planning.startAt,
        DATE_INPUT_FORMAT
      );

      for (const month of planning.planningMonths) {
        month.hidden = false;
        month.searchTerm = "";
        month.searchType = null;
        month.searchPaymentType = null;
        for (const item of month.items) {
          item.hidden = false;
          item.date = toHtmlDateTimeFormat(item.date, DATE_INPUT_FORMAT);
        }
        month.typesSpent = organizeSpents(
          month.typesSpent,
          month.budgets ?? []
        );
        month.showItemDetails = false;
        month.toggledGoals = false;

        if (month.budgets?.length) {
          month.budgets.forEach((budget) => {
            budget.isOnDB = true;
            budget.id = quickid();
          });
        }

        if (month.goals) {
          month.goals.isOnDB = true;
        }

        if (month.monthGoals) {
          month.monthGoals.isOnDB = true;
        }
      }

      if (!planning.planningMonths?.length) {
        planning.planningMonths = state.planning.planningMonths;
      }

      commit("SET_PLANNING", planning);
      commit("SET_EXISTING_YEARS", planning.existingYears);
    } catch (e) {
      console.log(e);
    }
  },
  applyCurrentPlanning({ commit }, planning) {
    commit("SET_PLANNING", planning);
  },
  setItemTypes({ commit }, types) {
    commit("SET_PLAIN_TYPES", types);
  },
  async editPlanning({ commit }, payload) {
    let message = "Planning Edited Succesfully";
    let icon = "success";
    try {
      await planningService.edit(payload.year, payload);
    } catch (e) {
      message = e.response?.data?.message ?? "Internal Server Error";
      icon = "error";
    } finally {
      commit("PLANNING_CREATED", { icon, message });
    }
  },
  async removeItem({ commit }, { year, idItem }) {
    try {
      await planningService.removeItem(year, idItem);
    } catch (e) {
      console.error(e);
    }
  },
  async saveItemTypes({ commit }, items) {
    let message = "Items updated with success";
    let icon = "success";
    try {
      await itemTypeService.saveMany(items);
    } catch (e) {
      message = e.response?.data?.message ?? "Internal Server Error";
      icon = "error";
    } finally {
      commit("ITEMS_UPDATED", { icon, message });
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
  async getItemTypes({ commit }) {
    try {
      const types = await itemTypeService.getTypes();

      // const toTreeSelectStyle = types.map()

      const plain = types.plain.map((type) => ({
        ...type,
        parent: {
          [type.id_parent]: true,
        },
      }));

      commit("SET_TYPES", types.treeSelect);
      commit("SET_PLAIN_TYPES", plain);
    } catch (e) {
      console.error(e);
    }
  },
  async getCards({ commit }) {
    try {
      const cards = await ccService.list();
      cards.forEach((card) => (card.showTransactions = false));
      commit("SET_CARDS", cards);
    } catch (e) {
      console.error(e);
    }
  },
  applyDefaultPlanning({ commit }) {
    commit("SET_PLANNING");
  },
};

const mutations = {
  SET_PLANNING(state, planning = DEFAULT_PLANNING) {
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
  },
  ITEMS_UPDATED(_, { icon, message }) {
    Toast.fire({
      icon,
      text: message,
    });
  },
  MOVIMENT_CREATED(_, { icon, message }) {
    Toast.fire({
      icon,
      text: message,
    });
  },
  SET_TYPES(state, value) {
    state.itemTypes = value;
  },
  SET_PLAIN_TYPES(state, value) {
    state.plainItemTypes = value;
  },
  SET_CARDS(state, value) {
    state.cards = value;
  },
  SET_EXISTING_YEARS(state, value) {
    state.existingYears = value;
  },
};

const getters = {
  monthGetter(state) {
    return state.months;
  },
  planningGetter(state) {
    return state.planning;
  },
  itemTypesGetter(state) {
    return state.itemTypes;
  },
  cardsGetter(state) {
    return state.cards;
  },
  plainItemTypesGetter(state) {
    return state.plainItemTypes;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
