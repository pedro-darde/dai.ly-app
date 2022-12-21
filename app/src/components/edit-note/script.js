import WriteNote from "../write-note/WriteNote.vue";
export default {
  components: {
    WriteNote,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    note: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
