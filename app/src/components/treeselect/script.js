import quickid from "@/helpers/quickid";
import "vue3-treeselect/dist/vue3-treeselect.css";
import Treeselect from "vue3-treeselect";
export default {
  components: {
    Treeselect,
  },
  props: {
    value: {
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      default: quickid(),
    },
    placeholder: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text: this.value,
    };
  },
  watch: {
    text(value) {
      this.$emit("input", value);
    },
    value(value) {
      this.text = value;
    },
  },
};
