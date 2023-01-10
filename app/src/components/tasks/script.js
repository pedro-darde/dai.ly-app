import { mapGetters } from "vuex";
import Header from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import WriteTask from "../write-task/WriteTask.vue";
import Task from "../task/Task.vue";
export default {
  components: { Header, NavbarComponent, WriteTask, Task },
  async created() {
    await Promise.all([
      this.$store.dispatch("task/setCurrentTask"),
      this.$store.dispatch("task/getActiveTasks"),
      this.$store.dispatch("note/allNotes")
    ])
  },
  computed: {
    ...mapGetters({
      tasks: "task/activeTasksGetter",
    }),
  },
};
