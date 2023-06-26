import RawPopup from "../../popup/RawPopup.vue";
import { popupVisibility } from "@/mixins/Popup";
import MoneyInput from "../../money-input/MoneyInput.vue";
import Treeselect from "../../treeselect/Treeselect.vue";
import plus from "../../icons/plus.vue";
import remove from "../../icons/remove.vue";
import SwalMixin from "@/mixins/SwalMixin";
import quickid from "@/helpers/quickid";
import { goalsService } from "@/services/GoalsService";
export default {
  mixins: [popupVisibility, SwalMixin],
  props: {
    idPlanningMonth: {
      required: true,
    },
    currentGoals: {
      type: Object,
      requried: false,
    },
    currentBudgets: {
      type: Array,
      required: false,
    },
  },
  components: {
    RawPopup,
    MoneyInput,
    Treeselect,
    plus,
    remove,
  },
  computed: {
    itemTypes() {
      return this.$store.state.planning.itemTypes;
    },
  },
  data() {
    return {
      budgets: this.currentBudgets?.length
        ? JSON.parse(JSON.stringify(this.currentBudgets))
        : [
            {
              planningMonth: this.idPlanningMonth,
              type: null,
              amount: 0,
              id: quickid(),
              isOnDB: false,
            },
          ],
    };
  },
  methods: {
    addBudget() {
      this.budgets.push({
        id: quickid(),
        planningMonth: this.idPlanningMonth,
        type: null,
        amount: 0,
        isOnDB: false,
      });
    },
    removeBudget(budgetId) {
      this.budgets = this.budgets.filter(({ id }) => id !== budgetId);
    },
    async save() {
      const budgetCounts = this.budgets.reduce((acc, item) => {
        if (!item.type) return {};
        if (!acc[item.type]) {
          acc[item.type] = 0;
        }
        acc[item.type] += 1;
        return acc;
      }, {});
      if (Object.values(budgetCounts).some((count) => count > 1)) {
        this.toastError(
          "There is some budgets with the same Type, please verify."
        );
        return;
      }

      try {
        const data = {
          budgets: this.budgets,
        }
        await goalsService.save(data);
        this.toastSuccess("Goals created");
        this.disband();
      } catch (e) {
        this.toastError("Error while creating.");
      }
    },
    isLastBudget(id) {
      const index = this.budgets.findIndex((item) => item.id === id);
      return index === this.budgets.length - 1;
    },
  },
  watch: {
    visible(value) {
      if (!value) {
        this.budgets = this.currentBudgets?.length
          ? JSON.parse(JSON.stringify(this.currentBudgets))
          : [
              {
                id: quickid(),
                planningMonth: this.idPlanningMonth,
                idType: null,
                amount: 0,
                isOnDB: false,
              },
            ];
      }
    },
  },
};
