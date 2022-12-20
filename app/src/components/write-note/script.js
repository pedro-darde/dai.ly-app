import { throttle } from "lodash";
import Ok from "../icons/ok.vue";
export default {
  data: () => ({
    note: {
      description: "",
      fixed: false,
    },
  }),
  components: { Ok },
  created() {
    const currentNote = this.$store.getters["note/noteGetter"];
    this.note = { ...currentNote };
  },
  methods: {
    async saveNote() {
      await this.$store.dispatch("note/saveNote", this.note);
      await this.$store.dispatch("note/getLatestNotes");
      const currentNote = this.$store.getters["note/noteGetter"];
      this.note = { ...currentNote };
    },
  },
  watch: {
    note: {
      deep: true,
      handler: throttle(function (value) {
        this.$store.dispatch("note/setCurrentNote", value);
      }, 500),
    },
  },
};
