import { createApp } from "vue";
import VueMask from "v-mask";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import toDateBR from "./filters/toDateBR";
import toMonetary from "./filters/toMonetary";
import cutText from "./filters/cutText";
import LottieAnimation from "lottie-web-vue";


const filters = require.context("./filters", true, /\.js$/i);


const app = createApp({
  ...App
})
app.config.globalProperties.filters = {

}
filters.keys().map((key) => {
  const filterName = key.split("/").pop().split(".")[0]
  app.config.globalProperties.filters[filterName] = filters(key).default
});

app.use(router)
app.use(store)
app.component("lottie-animation", LottieAnimation);
app.use(VueMask);
app.config.productionTip = false;
app.directive("trim", {
  inserted(el, binding) {
    const maxLength = binding.value || 5;
    const str = el.innerHTML;
    const spllitedInfo = str.split(" ");
    if (spllitedInfo.length < maxLength) return spllitedInfo.join(" ");
    el.innerHTML = spllitedInfo
        .slice(0, maxLength)
        .join(" ")
        .concat("...");
  },
});
app.mount("#app");
