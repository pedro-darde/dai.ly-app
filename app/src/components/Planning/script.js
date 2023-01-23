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
import PlanningPreview from '../PlanningPreview/PlanningPreview.vue'
import planningCalculator from "@/mixins/planningCalculator";
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
    PlanningPreview
  },
  props: {
    year: Number,
    currentPlanning: {
      type: Object,
      required: false,
      default: () => ({
        year: new Date().getFullYear(),
        planningTitle: "",
        expectedAmount: 0,
        planningStart: toHtmlDateTimeFormat(new Date()),
        planningEnd: null,
        planningMonths: [
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
                description: ""
              },
            ],
          },
        ],
      })
    },
  },
  mixins: [planningCalculator],
  data() {
    return {
      planning: this.currentPlanning,
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
      this.planning.planningMonths.push({
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
      this.planning.planningMonths = this.planning.planningMonths.filter(
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
        description: ""
      });
    },
    removeItem(month, idItem) {
      month.items = month.items.filter((item) => item.id !== idItem);
    },
    isLastMonth(id) {
      const index = this.planning.planningMonths.findIndex((item) => item.id === id);
      return index === this.planning.planningMonths.length - 1;
    },
    isLastItem(month, id) {
      const index = month.items.findIndex((item) => item.id === id);
      return index === month.items.length - 1;
    },
    getMonthOptions(month) {
      const idsMonth = this.planning.planningMonths.filter(item => item.id !== month.id).map(month => month.idMonth)
      return this.planning.planningMonths.filter(item => !idsMonth.includes(item.id))
    },
    async save() {
      const payload = {
        planningTitle: this.planning.planningTitle,
        planningStart: this.planning.planningStart,
        planningEnd: this.planning.planningEnd,
        year: this.year,
        expectedAmount: this.planning.expectedAmount,
        months: this.planning.planningMonths.map(month => ({
          ...month,
          totalIn: this.in(month),
          totalOut: this.out(month),
          spentOnDebit: this.spentOnDebitMonth(month),
          spentOnCredit: this.spentOnCreditMonth(month)
        }))
      }

      await this.$store.dispatch("planning/createPlanning", payload)

    }
  },
  computed: {
    months() {
      return this.$store.getters["planning/monthGetter"];
    },
  },
};
