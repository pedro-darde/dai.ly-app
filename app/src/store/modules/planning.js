import { DATE_INPUT_FORMAT } from "@/constants/Formats";
import { toHtmlDateTimeFormat } from "@/helpers/DateFormatter";
import quickid from "@/helpers/quickid";
import { Toast } from "@/lib/sweetalert";
import { itemTypeService } from "@/services/ItemTypeService";
import { planningService } from "@/services/PlanningService";
import { ccService } from '@/services/CCService'
const DEFAULT_PLANNING = {
  id: null,
  year: new Date().getFullYear(),
  title: "",
  expectedAmount: 0,
  startAt: new Date(),
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
          date: new Date(),
          paymentMethod: "debit",
          description: "",
          idType: null,
          idCard: null,
          idPlanningMonth: null
        },
      ],
    },
  ],
}
const state = {
  planning: DEFAULT_PLANNING,
  months: [],
  itemTypes: [],
  cards: []
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
  async changePlanningYear({ commit, state }, year) {
    try {
      let planning = await planningService.get(year) || DEFAULT_PLANNING;
      planning.startAt = toHtmlDateTimeFormat(planning.startAt, DATE_INPUT_FORMAT)
      
      for (const month of planning.planningMonths) {
          for (const item of month.items) {
            item.date = toHtmlDateTimeFormat(item.date, DATE_INPUT_FORMAT)
          }

          month.typesSpent.forEach(spent => {
            spent.items = month.items.filter(item => item.idType === spent.type && item.operation === spent.operation)
            spent.toggledItems = false
          })
      }

      if (!planning.planningMonths?.length) {
        planning.planningMonths = state.planning.planningMonths
      }

      commit("SET_PLANNING", planning);
    } catch (e) {
      console.log(e);
    }
  },
  applyCurrentPlanning({ commit }, planning) {
    commit("SET_PLANNING", planning)
  },
  async editPlanning({ commit }, payload) {
    let message = 'Planning Edited Succesfully'
    let icon = 'success'
    try {
      await planningService.edit(payload.year, payload)
    } catch (e) {
      message = e.response?.data?.message ?? "Internal Server Error"
      icon = 'error'
    } finally {
      commit('PLANNING_CREATED', { icon, message })
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
  async getItemTypes({ commit }) {
    try {
      const types = await itemTypeService.getTypes()
      commit("SET_TYPES", types)
    } catch (e) {
      console.error(e)
    }
  },
  async getCards({ commit }) {
    try {
      const cards = await ccService.list()
      cards.forEach(card => card.showTransactions = false)
      commit("SET_CARDS", cards)
    } catch (e) {
      console.error(e)
    }
  },
  applyDefaultPlanning({ commit }) {
      commit("SET_PLANNING")
  }
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
  SET_TYPES(state, value) {
    state.itemTypes = value
  },
  SET_CARDS(state, value) {
    state.cards = value
  }
};

const getters = {
  monthGetter(state) {
    return state.months
  },
  planningGetter(state) {
    return state.planning
  },
  itemTypesGetter(state) {
    return state.itemTypes
  },
  cardsGetter(state) {
    return state.cards
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
