import { range } from "lodash";
import RawPopup from "../popup/RawPopup.vue";
import Input from "../input/Input.vue";
import Treeselect from "../treeselect/Treeselect.vue";
import MoneyInput from "../money-input/MoneyInput.vue";
import Select from "../select/Select.vue";
import { popupVisibility } from "@/mixins/Popup";
import { add } from "date-fns";
import SwalMixin from "@/mixins/SwalMixin";
import { planningService } from "@/services/PlanningService";
export default {
  components: {
    RawPopup,
    Treeselect,
    Input,
    MoneyInput,
    Select,
  },
  mixins: [popupVisibility, SwalMixin],
  props: {
    planningYear: {
      type: Number,
    },
  },
  data() {
    return {
      installmentOptions: range(2, 24),
      description: "",
      type: null,
      valueInstallment: 0,
      startDate: new Date(),
      numberOfInstallments: null,
      installments: [],
      paymentMethod: "debit",
      card: null,
      paymentMethods: [
        { name: "Debit", value: "debit" },
        { name: "Credit", value: "credit" },
      ],
      isRecurrent: false,
    };
  },
  computed: {
    itemTypes() {
      return this.$store.state.planning.itemTypes;
    },
    existingYears() {
      return this.$store.state.planning.existingYears;
    },
    planning() {
      return this.$store.state.planning.planning;
    },
    cards() {
      return this.$store.state.planning.cards;
    },
    months() {
      return this.$store.state.planning.months;
    },
  },
  methods: {
    generateInstallments() {
      if (this.valueInstallment !== 0 && this.numberOfInstallments) {
        const installmentValue = this.isRecurrent
          ? this.valueInstallment
          : (this.valueInstallment / this.numberOfInstallments).toFixed(2);
        this.installments = this.generateInstallmentsMonths(installmentValue);
      }
    },
    generateInstallmentsMonths(installmentValue) {
      const startDate =
        this.startDate instanceof Date
          ? this.startDate
          : new Date(this.startDate);
      return Array.from({ length: this.numberOfInstallments }, (_, idx) => {
        const date = add(startDate, {
          months: idx,
        });
        const planning =
          this.existingYears.find((item) => item.year === date.getFullYear())
            ?.id ?? null;

        const planningMonth =
          this.planning.planningMonths.find(
            (item) =>
              item.idPlanning === planning &&
              item.idMonth === date.getMonth() + 1
          )?.id ?? null;
        return {
          description: this.getItemDescription(idx + 1, date.getMonth() + 1),
          value: +installmentValue,
          date,
          month: date.getMonth() + 1,
          idType: this.type,
          paymentMethod: this.paymentMethod,
          operation: "out",
          year: date.getFullYear(),
          hasMonth: "",
          planning,
          idPlanningMonth: planningMonth,
          idCard: this.card,
        };
      });
    },
    async save() {
      try {
        const willPassCurrentPlanning = this.installments.some(
          (item) => item.date.getFullYear() > this.planningYear
        );
        if (willPassCurrentPlanning) {
          const result = await this.showConfirm(
            "This installments will pass the current planning, do you wish to continue?",
            "Atention!"
          );
          if (!result.isConfirmed) {
            return;
          }
        }
        const months = {
          willCreatePlanningAndMonthPlanning: this.organizeItemsToStartPlanning(
            this.installments.filter(
              (item) => !item.planning && !item.idPlanningMonth
            )
          ),
          willCreateOnlyPlanningMonth: this.installments.filter(
            (item) => !item.idPlanningMonth && !!item.planning
          ),
          willCreateOnlyItems: this.installments.filter(
            (item) => !!item.idPlanningMonth && !!item.planning
          ),
        };
        await planningService.createInstallmens(this.planning.year, months);
        await this.toastSuccess("Installments created succesfully.");
        this.disband();
      } catch (e) {
        await this.toastError("Error while creating installments.");
      }
    },
    organizeItemsToStartPlanning(items) {
      const plannings = [];
      const groupedByYear = items.reduce((acc, item) => {
        if (!acc[item.year]) {
          acc[item.year] = [];
        }
        acc[item.year].push(item);
        return acc;
      }, {});

      for (const year in groupedByYear) {
        const firstItem = groupedByYear[year][0];
        plannings.push({
          startAt: firstItem.date,
          endAt: firstItem.date,
          year: firstItem.year,
          title: `Planning created automatically - REF ${firstItem.description}`,
          expectedAmount: firstItem.value,
          months: groupedByYear[year].map((item) => ({
            idMonth: item.month,
            totalIn: 0,
            totalOut: item.value,
            spentOnCredit: 0,
            spentOnDebit: 0,
            creditStatus: 0,
            items: [
              {
                value: item.value,
                operation: item.operation,
                date: item.date,
                paymentMethod: item.paymentMethod,
                description: item.description,
                idType: item.idType,
                idCard: item.idCard,
              },
            ],
          })),
        });
      }
      return plannings;
    },
    getItemDescription(installmentNumber, month) {
      if (this.isRecurrent)
        return this.description
          .concat(" - ")
          .concat(
            this.months.find((item) => item.monthAsNumber === month)?.monthName
          );
      return `Installment ${installmentNumber} of ${this.description}`;
    },
  },

  watch: {
    visible(value) {
      if (!value) this.installments = [];
    },
  },
};
