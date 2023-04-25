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
    rows: {
      type: Number,
      default: 5,
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
