import HeaderComponent from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Select from  "../select/Select.vue"
import Planning from '../Planning/Planning.vue'
import { range } from 'lodash'
import { mapGetters } from "vuex";
import { usePopup } from "@/mixins/popup";
import BankCard from '../bank-card/card.vue'
export default {
    mixins: [usePopup("bankCard")],
    components: { NavbarComponent, HeaderComponent, Select, Planning, BankCard},
    data() {
        return {
            year: (new Date()).getFullYear(),
            years: range((new Date()).getFullYear() - 10, (new Date()).getFullYear() + 20),
            loading: false
        }
    },
    async created() {
        this.loading = true
        await this.$store.dispatch("planning/changePlanningYear", this.year)
        this.loading = false
    },
    methods: {
        createCC() {
            this.toggleBankCard(!this.popupBankCardVisible);
        },
        handleCC(value) {
            this.createCC(value);
        },
    },
    watch: {
        year(value) {
           this.$store.dispatch("planning/changePlanningYear", value)
        }
    },
    computed: {
        ...mapGetters({
            "planning": "planning/planningGetter" 
        })
    }

}