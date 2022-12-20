import { mapGetters } from "vuex";

export default {
  data: () => ({
    defaultClass:
      "inline-flex flex-shrink-0 justify-center items-center w-8 h-8",
  }),
  computed: {
    ...mapGetters({
      show: "note/showToastGetter",
      message: "note/toastMessageGetter",
      type: "note/toastMessageTypeGetter",
    }),
    color() {
      if (this.type === "success") return "green";
      return "red";
    },
  },
};
