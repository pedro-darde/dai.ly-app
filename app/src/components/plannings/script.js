import HeaderComponent from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Select from  "../select/Select.vue"
import Planning from '../Planning/Planning.vue'
import { range } from 'lodash'
import { mapGetters, mapState } from "vuex";

export default {
    components: { NavbarComponent, HeaderComponent, Select, Planning },
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