import { mapGetters } from "vuex";
import Header from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import WriteTask from "../write-task/WriteTask.vue";
import Task from "../task/Task.vue";
export default {
  components: { Header, NavbarComponent, WriteTask, Task },
  async created() {
    this.$store.dispatch("task/setCurrentTask");
    await this.$store.dispatch("task/getTasks");
  },
  computed: {
    ...mapGetters({
      tasks: "task/tasksGetter",
    }),
  },
};
