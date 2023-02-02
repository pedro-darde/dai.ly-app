import quickid from "@/helpers/quickid";
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
      default: quickid(),
    },
    placeholder: {
      type: String,
      default: "",
    },
    extraProps: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    mask: {
      type: String,
      required: false
    }
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
      if (!value) this.text = value;
    },
  },
};
