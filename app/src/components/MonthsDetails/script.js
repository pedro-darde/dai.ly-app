import planningCalculator from "@/mixins/planningCalculator";
import {popupVisibility} from "@/mixins/popup";
import { mapGetters } from "vuex";
import RawPopup from '../popup/RawPopup.vue'
import Details from '../ItemType/Details/Details.vue'
export default {
    mixins: [popupVisibility, planningCalculator],
    components: {RawPopup, Details},
    props: {
        planningMonths: {
            required: true,
            type: Array
        }
    },
    data() {
        return {
            showItemDetails: false
        }
    },
    computed: {
        ...mapGetters({
            monthsDB: "planning/monthGetter"
        }),
        monthsGroupped() {
            return this.planningMonths.map(month => ({
                ...month,
                monthName: this.monthsDB.find(item => item.id === month.idMonth)?.monthName ,
                balance: this.monthBalance(month),
                In: this.in(month),
                Out: this.out(month),
                spentOnDebit: this.spentOnDebitMonth(month),
                spentOnCredit: this.spentOnCreditMonth(month)
            }))
        }
    }
}