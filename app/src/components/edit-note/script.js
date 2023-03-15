import WriteNote from "../write-note/WriteNote.vue";
import { popupVisibility } from "@/mixins/Popup";
import RawPopup from "../popup/RawPopup.vue";
export default {
  mixins: [popupVisibility],
  components: {
    WriteNote,
    RawPopup,
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
};
