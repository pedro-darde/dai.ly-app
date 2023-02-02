import Vue from "vue";
import VueMask from 'v-mask'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import toDateBR from "./filters/toDateBR";
import toMonetary from "./filters/toMonetary";

Vue.use(VueMask)
Vue.config.productionTip = false;
Vue.filter("toDateBR", toDateBR);
Vue.filter("toMonetary", toMonetary);
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
