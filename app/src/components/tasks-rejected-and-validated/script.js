import { mapGetters } from "vuex";
import { REJECTED, VALIDATED } from "@/constants/TaskStatus";
import notesInfo from "@/mixins/NotesInfo";
import Card from "../card/Card.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Header from "../header/Header.vue";

export default {
  mixins: [notesInfo],
  components: {
    NavbarComponent,
    Header,
    Card,
  },
  methods: {
    isTaskValidated(task) {
      return task.status === VALIDATED;
    },
    getBgColor(task) {
      if (task.status === REJECTED) return "bg-red-200";
      if (task.timeSpent > task.expectedTime) return "bg-yellow-200";
      return "bg-green-200";
    },
    getInfoTask(task) {
      if (task.status === REJECTED) return "Note rejected";
      if (task.timeSpent > task.expectedTime)
        return "Warning! This task take more days than expected!";
      return "Task done in time!";
    },
    getNotesTask(notes) {
      const allNotes = this.$store.getters["note/allNotesGetter"];
      return allNotes.filter(({ id }) => notes.includes(id));
    },
  },
  computed: {
    ...mapGetters({
      tasks: "task/tasksRejectedAndValidatedGetter",
    }),
  },
};
