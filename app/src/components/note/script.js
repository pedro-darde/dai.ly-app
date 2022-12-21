import SwalMixin from "@/mixins/SwalMixin";
import Remove from "../icons/remove.vue";
import EditNote from "../edit-note/EditNote.vue";
export default {
  mixins: [SwalMixin],
  components: { Remove, EditNote },
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
    handleShowEdit() {
      console.log("aqui")
      this.showEdit = !this.showEdit
    }
  },
};
