import Vue from "vue";
import App from "./App.vue";
import router from './router'
import store from "./store";
import './assets/tailwind.css'
import toDateBR from "./assets/filters/toDateBR";

Vue.config.productionTip = false;
Vue.filter("toDateBR", toDateBR)
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount("#app");
