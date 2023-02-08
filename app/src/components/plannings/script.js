import HeaderComponent from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Select from "../select/Select.vue"
import Planning from '../Planning/Planning.vue'
import { range } from 'lodash'
import { mapGetters } from "vuex";
import { usePopup } from "@/mixins/popup";
import BankCard from '../bank-card/card.vue'
import CC from '../icons/cc.vue'
import { ccService } from "@/services/CCService";
import { Toast } from "@/lib/sweetalert";
export default {
    mixins: [usePopup("bankCard")],
    components: { NavbarComponent, HeaderComponent, Select, Planning, BankCard, CC },
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
        async saveCC(payload) {
            let close = true
            let message = 'Card created successfully'
            let icon = 'success'
            try {
                await ccService.save(payload)
            } catch (e) {
                close = false;
                icon = 'error'
                message = e.response?.data?.message ?? "Internal Server Error"
            } finally {
                Toast.fire({
                    icon,
                    text: message,
                });
                if (close) this.handleCC(close)
            }
        }
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