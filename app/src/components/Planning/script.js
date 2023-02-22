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
import PlanningPreview from "../PlanningPreview/PlanningPreview.vue";
import planningCalculator from "@/mixins/planningCalculator";
import SwalMixin from "@/mixins/SwalMixin";
import { mapState } from "vuex";
import { cloneDeep, debounce } from "lodash";
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
    PlanningPreview,
  },
  props: {
    year: Number,
  },
  mixins: [planningCalculator, SwalMixin],
  data() {
    return {
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
      monthsToRemove: [],
      itemsToRemove: [],
    };
  },
  methods: {
    addMonth() {
      this.planning.planningMonths.push({
        id: quickid(),
        expectedAmount: 0,
        idMonth: new Date().getMonth(),
        items: [
          {
            id: quickid(),
            value: 0,
            operation: "out",
            date: toHtmlDateTimeFormat(new Date()),
            paymentMethod: "credit",
          },
        ],
      });
    },
    removeMonth(id) {
      if (this.planning.planningMonths?.length === 1) {
        this.toastError("Keep at least one month to the planning");
        return;
      }

      if (this.onEdit) {
        const month = this.planning.planningMonths.find(
          (item) => item.id === id
        );
        if (this.isIdFromDB(month)) {
          this.monthsToRemove.push(id);
          this.itemsToRemove.push([
            ...month.items.filter(isIdFromDB).map(({ id }) => id),
          ]);
        }
      }
      this.planning.planningMonths = this.planning.planningMonths.filter(
        (item) => item.id !== id
      );
    },
    addItem(month) {
      month.items.push({
        idPlanningMonth: month.id,
        id: quickid(),
        value: 0,
        operation: "out",
        date: toHtmlDateTimeFormat(new Date()),
        paymentMethod: "debit",
        description: "",
        idPlanningMonth: month.id,
        idType: null,
        idCard: null,
      });
    },
    removeItem(month, idItem) {
      if (month.items?.length === 1) {
        this.toastError("Keep at least one item to your month.");
        return;
      }

      const item = month.items.find((item) => item.id === idItem);

      if (this.onEdit && this.isIdFromDB(item)) {
        this.itemsToRemove.push(item.id);
      }
      month.items = month.items.filter((item) => item.id !== idItem);
    },
    isLastMonth(id) {
      const index = this.planning.planningMonths.findIndex(
        (item) => item.id === id
      );
      return index === this.planning.planningMonths.length - 1;
    },
    isLastItem(month, id) {
      const index = month.items.findIndex((item) => item.id === id);
      return index === month.items.length - 1;
    },
    getMonthOptions(month) {
      const idsMonth = this.months
        .filter((item) => item.id !== month.id)
        .map((month) => month.idMonth);
      return this.months.filter((item) => !idsMonth.includes(item.id));
    },
    async save() {
      let payload = {
        id: this.planning.id,
        title: this.planning.title,
        startAt: this.planning.startAt,
        endAt: this.planning.endAt,
        year: this.year,
        expectedAmount: this.planning.expectedAmount,
        months: this.planning.planningMonths.map((month) => ({
          ...month,
          totalIn: this.in(month),
          totalOut: this.out(month),
          spentOnDebit: this.spentOnDebitMonth(month),
          spentOnCredit: this.spentOnCreditMonth(month),
        })),
      };

      let action = "createPlanning";
      console.log(this.onEdit);
      if (this.onEdit) {
        action = "editPlanning";
        payload.months = this.makeToUpAdd(this.planning.planningMonths);
      }
      await this.$store.dispatch(`planning/${action}`, {
        ...payload,
        monthsToRemove: this.monthsToRemove,
        itemsToRemove: this.itemsToRemove,
      });
    },
    isIdFromDB({ id }) {
      return !!id && !isNaN(+id);
    },
    canRemove(key) {
      if (this.onEdit) return true;
      return key != 0;
    },
    makeToUpAdd(array, onMonth = true) {
      return array.reduce(
        (acc, current, index) => {
          const isOnDb = !isNaN(+current.id);
          let copy = { ...current };
          if (onMonth) {
            Object.assign(copy, {
              totalIn: this.in(copy),
              totalOut: this.out(copy),
              spentOnDebit: this.spentOnDebitMonth(copy),
              spentOnCredit: this.spentOnCreditMonth(copy),
              items: this.makeToUpAdd(copy.items, false),
            });
          }
          const key = isOnDb ? "toUpdate" : "toAdd";
          acc[key].push(copy);
          return acc;
        },
        { toAdd: [], toUpdate: [] }
      );
    },
  },
  computed: {
    itemTypes() {
      return this.$store.getters["planning/itemTypesGetter"];
    },
    months() {
      return this.$store.getters["planning/monthGetter"];
    },
    cards() {
      return this.$store.getters["planning/cardsGetter"];
    },
    onEdit() {
      return (
        this.planning.hasOwnProperty("id") &&
        this.isIdFromDB(this.planning ?? { id: null })
      );
    },
    planning: {
      set(value) {
        this.$store.dispatch("planning/applyCurrentPlanning", value);
      },
      get() {
        return this.$store.state.planning.planning;
      },
    },
  },
  unmounted() {
    this.$store.dispatch("planning/applyDefaultPlanning");
  },
  watch: {
    planning: {
      handler(value) {
        this.planning = value;
      },
      deep: true,
    },
  },
};
