import money from "../icons/money.vue";
import calendar from "../icons/calendar.vue";
import Input from "../input/Input.vue";
import MoneyInput from "../MoneyInput/MoneyInput.vue";
import { toHtmlDateTimeFormat } from "@/helpers/DateFormatter";
import quickid from "@/helpers/quickid";
import plus from "../icons/plus.vue";
import Select from "../select/Select.vue";
import char from "../icons/char.vue";
import remove from "../icons/remove.vue";
const DEFAULT_PLANNING = {
  year: new Date().getFullYear(),
  title: "",
  expectedAmount: 0,
  planningStart: toHtmlDateTimeFormat(new Date()),
  planningEnd: null,
  months: [
    {
      id: quickid(),
      expectedAmount: 0,
      idMonth: new Date().getMonth(),
      items: [
        {
          id: quickid(),
          value: 0,
          operation: "out",
          date: toHtmlDateTimeFormat(new Date()),
          paymentMethod: "debit",
        },
      ],
    },
  ],
};

export default {
  components: {
    money,
    Input,
    MoneyInput,
    calendar,
    plus,
    Select,
    char,
    remove,
  },
  props: {
    year: Number,
    currentPlanning: {
      type: Object,
      required: false,
    },
  },
  data() {
    const planning = this.planning ?? DEFAULT_PLANNING;
    return {
      planning,
      operations: [
        {
          name: "In (+)",
          value: "in",
        },
        {
          name: "Out (-)",
          value: "out",
        },
      ],
      paymentMethods: [
        { name: "Debit", value: "debit" },
        { name: "Credit", value: "credit" },
      ],
    };
  },
  methods: {
    addMonth() {
      this.planning.months.push({
        id: quickid(),
        expectedAmount: 0,
        idMonth: (new Date()).getMonth(),
        items: [
          {
            value: 0,
            operation: "out",
            date: toHtmlDateTimeFormat(new Date()),
            paymentMethod: "credit",
          },
        ],
      });
    },
    removeMonth(id) {
      this.planning.months = this.planning.months.filter(
        (item) => item.id !== id
      );
    },
    addItem(month) {
      month.items.push({
        id: quickid(),
        value: 0,
        operation: "out",
        date: toHtmlDateTimeFormat(new Date()),
        paymentMethod: "debit",
      });
    },
    removeItem(month, idItem) {
      month.items = month.items.filter((item) => item.id !== idItem);
    },
    isLastMonth(id) {
      const index = this.planning.months.findIndex((item) => item.id === id);
      return index === this.planning.months.length - 1;
    },
    isLastItem(month, id) {
      const index = month.items.findIndex((item) => item.id === id);
      return index === month.items.length - 1;
    },
    monthBalance(month) {
      return month.items.reduce((accPlanning, item) => {
        if (item.operation === "in") {
          accPlanning += item.value;
        } else {
          accPlanning -= item.value;
        }
        return accPlanning;
      }, 0);
    },
  },
  computed: {
    months() {
      return this.$store.getters["planning/monthGetter"];
    },
    planningBalance() {
      const value = this.planning.months.reduce((acc, planning) => {
        acc += planning.items.reduce((accPlanning, item) => {
          if (item.operation === "in") {
            accPlanning += item.value;
          } else {
            accPlanning -= item.value;
          }
          return accPlanning;
        }, 0);
        return acc;
      }, 0);
      return value;
    },
  },
};
