import { throttle } from "lodash";
import Ok from "../icons/ok.vue";
import {mapGetters} from "vuex";
import Select from '../select/Select.vue'
export default {
  components: { Ok, Select },
  data: () => ({
    note: {
      description: "",
      fixed: false,
      tasks: []
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
      await this.$store.dispatch(action, {...this.note, ...this.tasksToInsertAndToRemove()});
      await this.$store.dispatch("note/getLatestNotes");
      if (!this.onEdit) {
        const currentNote = this.$store.getters["note/noteGetter"];
        this.note = { ...currentNote };
        return;
      }
      this.$emit("saved");
    },
    tasksToInsertAndToRemove() {
      if(!this.onEdit) return null
      const toInsert = this.note.tasks.filter((task) => !this.currentNote.tasks.includes(task));
      const toRemove = this.currentNote.tasks.filter((task) => !this.note.tasks.includes(task));
      return {
        tasksToInsert: toInsert,
        tasksToRemove: toRemove
      }
    }
  },
  computed: {
    ...mapGetters({
      tasks: "task/allTasksGetter"
    })
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
