import { mapGetters } from "vuex";
import Card from "../card/Card.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Header from "../header/Header.vue";
import taskInfo from "@/mixins/task-info";
export default {
  mixins: [taskInfo],
  components: {
    NavbarComponent,
    Header,
    Card,
  },
  computed: {
    ...mapGetters({
      notes: "note/allNotesGetter",
      tasks: "task/allTasksGetter"
    }),
  },
  methods: {
    async toggleInfoTasks(note) {
      const tasks = this.tasks.filter(({ id }) => note.tasks.includes(id))
      await this.showTaskInfo(tasks)
    }
  }
};
