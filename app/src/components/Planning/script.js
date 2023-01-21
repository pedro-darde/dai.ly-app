

import money from "../icons/money.vue"
import Input from '../input/Input.vue'
import MoneyInput from '../MoneyInput/MoneyInput.vue'
import { toHtmlDateTimeFormat } from "@/helpers/DateFormatter"
const DEFAULT_PLANNING = {
    year: (new Date()).getFullYear(),
    title: "",
    expectedAmount: 0,
    planningStart: toHtmlDateTimeFormat(new Date()),
    planningEnd: null,
    months: [{
        expectedAmount: 0,
        idMonth: null,
        items: []
    }]
}

export default {
    components: {
        money,
        Input,
        MoneyInput
    },
    props: {
        year: Number,
        currentPlanning: {
            type: Object,
            required: false
        }
    },
    data() {
        const planning = this.planning ?? DEFAULT_PLANNING
        return {
            planning
        }
    },
}