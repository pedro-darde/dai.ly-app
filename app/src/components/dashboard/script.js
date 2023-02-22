import { range } from "lodash";
import HeaderComponent from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Select from "../select/Select.vue";

export default {
  components: {
    HeaderComponent,
    NavbarComponent,
    Select,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      years: range(
        new Date().getFullYear() - 10,
        new Date().getFullYear() + 20
      ),
      loading: false,
    };
  },
  methods: {
    async searchForDashboardStats() {
      this.loading = true;
      await this.$store.dispatch("planning/changePlanningYear", this.year);
      this.loading = false;
    },
  },
};
