import { uniqueId } from "lodash";

export default {
  props: {
    value: {
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      default: uniqueId(),
    },
    placeholder: {
      type: String,
      default: "",
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
  },
};
