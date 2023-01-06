import { popupVisibility } from "@/mixins/popup";
import RawPopup from "../popup/RawPopup.vue";
export default {
  mixins: [popupVisibility],
  components: {
    RawPopup,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
