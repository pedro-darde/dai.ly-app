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
      required: true,
      type: [Array, Object],
    },
    optionText: {
      required: false,
      type: String,
    },
    optionValue: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      text: this.value,
    };
  },
  methods: {
    getOptionValue(item, key) {
      if (this.optionValue) return item[this.optionValue];
      return key;
    },
    getOptionText(item) {
      if (this.optionText) return item[this.optionText];
      return item;
    },
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
