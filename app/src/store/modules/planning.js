import { planningService } from "@/services/PlanningService"

const state = {
    planning: null
}


const actions = {
    createPlanning({commit}, payload) {
            
    },
    async changePlanningYear({commit}, year) {
        try {
            const planning = await planningService.get(year)
            commit("SET_PLANNING", planning)
        } catch (e) {
            console.log(e)
        }
    },
    saveMonths({commit}, months) {

    }
}


const mutations = {
    SET_PLANNING(state, planning) {
        state.planning = planning
    }
}