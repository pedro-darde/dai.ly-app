import SwalMixin from "@/mixins/SwalMixin";
import Remove from "../icons/remove.vue";
import EditNote from "../edit-note/EditNote.vue";
import { usePopup } from "@/mixins/popup";
import Pencil from "../icons/pencil.vue";
export default {
  mixins: [SwalMixin, usePopup("editNote")],
  components: { Remove, EditNote, Pencil },
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
      const res = await this.showConfirm();
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
