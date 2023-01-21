import HeaderComponent from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Select from  "../select/Select.vue"
import { range } from 'lodash'

export default {
    components: { NavbarComponent, HeaderComponent, Select },
    data() {
        return {
            year: (new Date()).getFullYear(),
            years: range((new Date()).getFullYear() - 10, (new Date()).getFullYear() + 20)
        }
    },
    async created() {
        // await this.$store.dispatch("planning/changePlanningYear", (new Date()).getFullYear())
    }
}