import SwalMixin from "@/mixins/SwalMixin";
import BodyDetails from "./BodyDetails.vue";
export default {
  components: { BodyDetails },
  mixins: [SwalMixin],
  props: {
    details: {
      required: true,
      type: Array,
    },
    items: {
      type: Array,
    },
  },
  computed: {
    totalIn() {
      return this.getTotalForNestedChildren(this.details, "in");
    },
    totalOut() {
      return this.getTotalForNestedChildren(this.details, "out");
    },
    balance() {
      return this.totalIn - this.totalOut;
    },
  },
  methods: {
    shouldShowItems(detail) {
      return detail.toggledItems;
    },
    shouldShowDetail(detail) {
      return detail?.spents.length > 0;
    },
    getTotalForNestedChildren(children, inOrOut) {
      let total = 0;
      for (const child of children) {
        total += child?.spents
          .filter((item) => item.operation === inOrOut)
          .reduce((acc, { value }) => (acc += value), 0);
        if (child.children) {
          total += this.getTotalForNestedChildren(child.children, inOrOut);
        }
      }
      return total;
    },
    getSpentsValue(spents) {
      return spents.reduce((acc, { value }) => (acc += value), 0);
    },
  },
};
