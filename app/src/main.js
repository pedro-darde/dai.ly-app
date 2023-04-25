import Vue from "vue";
import VueMask from "v-mask";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import toDateBR from "./filters/toDateBR";
import toMonetary from "./filters/toMonetary";
import cutText from "./filters/cutText";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowAltCircleRight,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import LottieAnimation from "lottie-web-vue";
Vue.component("lottie-animation", LottieAnimation);

library.add(faArrowAltCircleRight, faBars);
Vue.use(VueMask);
Vue.config.productionTip = false;
Vue.filter("toDateBR", toDateBR);
Vue.filter("toMonetary", toMonetary);
Vue.filter("cutText", cutText);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.directive("trim", {
  inserted(el, binding) {
    const maxLength = binding.value || 5;
    const str = el.innerHTML;
    const spllitedInfo = str.split(" ");
    if (spllitedInfo.length < maxLength) return spllitedInfo.join(" ");
    const resultString = spllitedInfo
      .slice(0, maxLength)
      .join(" ")
      .concat("...");
    el.innerHTML = resultString;
  },
});
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
