import SwalMixin from "@/mixins/SwalMixin";
import Remove from "../icons/remove.vue";
export default {
  mixins: [SwalMixin],
  components: { Remove },
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
  },
};
