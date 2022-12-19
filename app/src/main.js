import Vue from "vue";
import App from "./App.vue";
import './assets/tailwind.css'
import store from "./store";

Vue.config.productionTip = false;
Vue.use(store)
new Vue({
  render: (h) => h(App),
}).$mount("#app");
