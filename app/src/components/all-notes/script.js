import { mapGetters } from "vuex";
import Card from "../card/Card.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Header from "../header/Header.vue";
import taskInfo from "@/mixins/TaskInfo";
import { usePopup } from "@/mixins/Popup";
import ViewNote from "../view-note/ViewNote.vue";
import Note from "../note/Note.vue";
export default {
  mixins: [taskInfo, usePopup("viewNote")],
  components: {
    NavbarComponent,
    Header,
    Card,
    ViewNote,
    Note,
  },
  computed: {
    ...mapGetters({
      notes: "note/allNotesGetter",
      tasks: "task/allTasksGetter",
    }),
  },
  methods: {
    async toggleInfoTasks(note) {
      const tasks = this.tasks.filter(({ id }) => note.tasks.includes(id));
      await this.showTaskInfo(tasks);
    },
    viewNote() {
      this.toggleViewNote(!this.popupViewNoteVisible);
    },
    handlePopup(value) {
      this.toggleViewNote(value);
    },
  },
};
