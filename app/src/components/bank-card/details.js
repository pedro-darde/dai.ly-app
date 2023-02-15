import { mapState } from "vuex";
import Preview from "./card-preview.vue";
export default {
  components: {
      Preview
  },
  computed: {
    ...mapState("planning", ["cards"]),
  },
  methods: {
    toggleTransactions(card) {

    }
  },
};
``