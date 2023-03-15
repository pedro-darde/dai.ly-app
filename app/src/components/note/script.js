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
          "O mesmo possuí vínculo com tasks e ao excluir esse vínculo será removido!";
      }
      const res = await this.showConfirm(
        html,
        "Você tem certeza que deseja remover o registro ?"
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
