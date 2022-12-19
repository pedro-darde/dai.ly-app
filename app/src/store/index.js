import Vuex from "vuex";
import note from "./modules/note";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: [note],
});
