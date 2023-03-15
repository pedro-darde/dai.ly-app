import { VueEditor } from "vue2-editor";

export default {
  props: {
    value: {
      required: true,
    },
  },
  components: {
    VueEditor,
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
