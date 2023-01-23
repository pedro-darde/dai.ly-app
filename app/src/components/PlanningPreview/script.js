import planningCalculator from "@/mixins/planningCalculator";
import { usePopup } from "@/mixins/popup"
import MonthsDetails from '../MonthsDetails/MonthsDetails.vue'
export default {
    mixins: [usePopup("monthsDetails"), planningCalculator],
    props: {
        planning: {
            type: Object,
            required: true
        }
    },
    components: {
      MonthsDetails
    },
    methods: {
      handlePopup(value) {
        this.toggleMonthsDetails(value);
      },
      seeMonthsDetails() {
        this.toggleMonthsDetails(!this.popupMonthsDetailsVisible);
      },
    },
    computed: {
      planningBalance() {
        const value = this.planning.planningMonths.reduce((acc, month) => {
          acc += this.monthBalance(month)
          return acc;
        }, 0);
        return value;
      },
      planningIn() {
        return this.planning.planningMonths.reduce((acc, planning) => {
          acc += planning.items.reduce((accPlanning, item) => {
            if (item.operation === "in") {
              accPlanning += item.value;
            } 
            return accPlanning;
          }, 0);
          return acc;
        }, 0);
      },
      planningOut() {
        return this.planning.planningMonths.reduce((acc, planning) => {
          acc += planning.items.reduce((accPlanning, item) => {
            if (item.operation === "out") {
              accPlanning += item.value;
            } 
            return accPlanning;
          }, 0);
          return acc;
        }, 0);
      },
      spentOnDebit() {
        return this.planning.planningMonths.reduce((acc, month)  => {
          acc += this.spentOnDebitMonth(month)
          return acc
        }, 0)
      },
      spentOnCredit() {
        return this.planning.planningMonths.reduce((acc, month)  => {
          acc += this.spentOnCreditMonth(month)
          return acc
        }, 0)
      },
    }
}