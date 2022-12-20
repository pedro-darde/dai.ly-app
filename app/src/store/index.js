import Vuex, { createLogger } from "vuex";
import note from "./modules/note";
import Vue from "vue";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
  modules: { note },
  // strict: debug,
  plugins: debug ? [createLogger()] : [],
});
