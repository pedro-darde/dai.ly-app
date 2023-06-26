import { createLogger, createStore } from "vuex";
import note from "./modules/note";
import task from "./modules/task";
import planning from "./modules/planning";
import dashboard from "./modules/dashboard";
import setting from "./modules/setting";
const debug = process.env.NODE_ENV !== "production";
export default createStore({
  modules: { note, task, planning, dashboard, setting },
  // strict: debug,
  plugins: debug ? [createLogger()] : [],
});
