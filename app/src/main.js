import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import toDateBR from "./filters/toDateBR";
import toMonetary from "./filters/toMonetary";

Vue.config.productionTip = false;
Vue.filter("toDateBR", toDateBR);
Vue.filter("toMonetary", toMonetary);
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
