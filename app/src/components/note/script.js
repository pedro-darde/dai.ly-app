import SwalMixin from "@/mixins/SwalMixin";
import Remove from "../icons/remove.vue";
import EditNote from "../edit-note/EditNote.vue";
import { usePopup } from "@/mixins/Popup";
import Pencil from "../icons/pencil.vue";
import Wsiwyg from "../wsiwyg/Wsiwyg.vue";
export default {
  mixins: [SwalMixin, usePopup("editNote")],
  components: { Remove, EditNote, Pencil, Wsiwyg },
  data: () => ({
    showEdit: false,
  }),
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async removeNote() {
      let html = " ";
      if (this.note.tasks?.length) {
        html +=
          "This note has linked tasks, if you remove, this link will be removed to!";
      }
      const res = await this.showConfirm(
        html,
        "Are you shure you want to remove ?"
      );
      if (res.isConfirmed) {
        await this.$store.dispatch("note/removeNote", this.note.id);
        await this.$store.dispatch("note/getLatestNotes");
      }
    },
    editNote() {
      this.toggleEditNote(!this.popupEditNoteVisible);
    },
    closeModal() {
      this.showEdit = false;
    },
    openModal() {
      this.showEdit = true;
    },
    handlePopup(value) {
      this.toggleEditNote(value);
    },
  },
};
