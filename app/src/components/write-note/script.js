import { throttle } from "lodash";
import Ok from "../icons/ok.vue";
export default {
  data: () => ({
    note: {
      description: "",
      fixed: false,
    },
  }),
  props: {
    onEdit: {
      type: Boolean,
      default: false,
    },
    currentNote: {
      type: Object,
      required: false,
    },
  },
  components: { Ok },
  created() {
    if (!this.onEdit) {
      const currentNote = this.$store.getters["note/noteGetter"];
      this.note = { ...currentNote };

      return;
    }

    this.note = { ...this.currentNote };
  },
  methods: {
    async saveNote() {
      const action = this.onEdit ? "note/editNote" : "note/saveNote";
      await this.$store.dispatch(action, this.note);
      await this.$store.dispatch("note/getLatestNotes");
      if (!this.onEdit) {
        const currentNote = this.$store.getters["note/noteGetter"];
        this.note = { ...currentNote };
        return;
      }
      this.$emit("saved");
    },
  },
  watch: {
    note: {
      deep: true,
      handler: throttle(function (value) {
        if (!this.onEdit) {
          this.$store.dispatch("note/setCurrentNote", value);
        }
      }, 500),
    },
  },
};
