import { createApp } from "vue";
import VueMask from "v-mask";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import LottieAnimation from "lottie-web-vue";
import filters from "./filters";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencil,  faTrash } from "@fortawesome/free-solid-svg-icons";
import Primevue from 'primevue/config';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import 'primevue/resources/themes/tailwind-light/theme.css';
import "primeicons/primeicons.css";
import Checkbox from 'primevue/checkbox';
library.add(faPencil, faTrash);

const app = createApp({
  ...App,
});
app.config.globalProperties.$filters = filters;

app.use(router);
app.use(store);
app.component("lottie-animation", LottieAnimation);
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(VueMask);
app.config.productionTip = false;
app.directive("trim", {
  inserted(el, binding) {
    const maxLength = binding.value || 5;
    const str = el.innerHTML;
    const spllitedInfo = str.split(" ");
    if (spllitedInfo.length < maxLength) return spllitedInfo.join(" ");
    el.innerHTML = spllitedInfo.slice(0, maxLength).join(" ").concat("...");
  },
});
app.use(Primevue);
app.component('Checkbox', Checkbox);

app.mount("#app");
