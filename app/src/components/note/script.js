import Remove from "../icons/remove.vue";
export default {
  components: { Remove },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
};
