import SwalMixin from "@/mixins/SwalMixin";
import Remove from "../icons/remove.vue";
import EditTask from "../edit-task/EditTask.vue";
import { usePopup } from "@/mixins/popup";
import Pencil from "../icons/pencil.vue";
export default {
  mixins: [SwalMixin, usePopup("editTask")],
  components: { Remove, Pencil, EditTask },
  data: () => ({
    showEdit: false,
  }),
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async removeTask() {
      const res = await this.showConfirm();
      if (res.isConfirmed) {
        await this.$store.dispatch("task/removeTask", this.task.id);
        await this.$store.dispatch("task/getLatestTasks");
      }
    },
    editTask() {
      this.toggleEditTask(!this.popupEditTaskVisible);
    },
    closeModal() {
      this.showEdit = false;
    },
    openModal() {
      this.showEdit = true;
    },
    handlePopup(value) {
      this.toggleEditTask(value);
    },
  },
};
