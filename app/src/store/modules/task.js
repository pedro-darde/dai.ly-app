const state = {
    tasks: [],
    currentTask: {}
}


const actions = {
    setCurrentTask({commit}, newValue = null) {
        if (!newValue) {
            newValue = {}
        }
        commit("SET_CURRENT_TASK")
    }
}

const getters = {}

const mutations = {
    SET_CURRENT_TASK(state, value) {
        state.currentTask = value
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}