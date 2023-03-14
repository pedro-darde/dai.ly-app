import { range } from "lodash";
import HeaderComponent from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Select from "../select/Select.vue";
import Pie from "../charts/Pie.vue";
import GroupedBarChart from "../charts/GroupedBar.vue";
import StackedColumn from "../charts/ColumnStacked.vue";
import Card from "../card/Card.vue";
import Spinner from "../spinner/Spinner.vue";
import { mapState } from "vuex";
import ColumnChart from "../charts/ColumnChart.vue";
export default {
  components: {
    HeaderComponent,
    NavbarComponent,
    Select,
    Pie,
    Card,
    GroupedBarChart,
    Spinner,
    StackedColumn,
    ColumnChart,
  },
  computed: {
    ...mapState("dashboard", [
      "inAndOutTypes",
      "reducedMonthValues",
      "stackedMonthWithItems",
      "outWithItems",
    ]),
  },
  data() {
    return {
      year: new Date().getFullYear(),
      years: range(
        new Date().getFullYear() - 10,
        new Date().getFullYear() + 20
      ),
      loading: true,
      typeLegends: [],
      spentValues: [],
      earnValues: [],
      reducedMonthLegends: [],
      reducedMonthSeries: [],
      stackedMonthLegends: [],
      stackedMonthSeries: [],
      outWithItemsLegends: [],
      outWithItemsSeries: [],
    };
  },
  methods: {
    async searchForDashboardStats() {
      this.loading = true;
      this.resetState();
      await this.$store.dispatch("dashboard/getAll", this.year);
      this.setChartValues();
    },
    setTotalChartsOptions() {
      this.typeLegends = this.inAndOutTypes.map((item) => item.description);
      this.spentValues = this.inAndOutTypes.map((item) => +item.spent);
      this.earnValues = this.inAndOutTypes.map((item) => +item.earn);
    },
    setMonthChartOptions() {
      this.reducedMonthLegends = this.reducedMonthValues.map(
        ({ month }) => month
      );
      this.reducedMonthSeries.push({
        name: "In",
        data: this.reducedMonthValues.map(({ in: t }) => t),
      });
      this.reducedMonthSeries.push({
        name: "Out",
        data: this.reducedMonthValues.map(({ out }) => out),
      });
      this.reducedMonthSeries.push({
        name: "Balance",
        data: this.reducedMonthValues.map(({ balance }) => balance),
      });
    },
    resetState() {
      this.typeLegends = [];
      this.spentValues = [];
      this.earnValues = [];
      this.reducedMonthLegends = [];
      this.reducedMonthSeries = [];
      this.stackedMonthLegends = [];
      this.stackedMonthSeries = [];
      this.outWithItemsLegends = [];
      this.outWithItemsSeries = [];
    },
    setChartValues() {
      this.setTotalChartsOptions();
      this.setMonthChartOptions();
      this.setStackedMonthData();
      this.setOutWithItemsData();
      this.loading = false;
    },
    setStackedMonthData() {
      this.stackedMonthLegends = this.stackedMonthWithItems?.info.map(
        ({ month_name }) => month_name
      );

      this.stackedMonthWithItems?.typeLegends.forEach(({ description }) => {
        this.stackedMonthSeries.push({
          name: description,
          data: [],
        });
      });

      this.stackedMonthWithItems?.info.forEach(({ items, month_name }) => {
        items.forEach(({ values, type_description }) => {
          const idx = this.stackedMonthSeries.findIndex(
            ({ name }) => name === type_description
          );
          const legendIdx = this.stackedMonthLegends.findIndex(
            (item) => item === month_name
          );
          for (let i = 0; i < this.stackedMonthLegends.length; i++) {
            if (i === legendIdx) {
              this.stackedMonthSeries[idx].data[i] = [];
              this.stackedMonthSeries[idx].data[i].push(
                values.reduce((acc, value) => (acc += value), 0).toFixed(2)
              );
            }

            if (!this.stackedMonthSeries[idx].data[i]) {
              this.stackedMonthSeries[idx].data[i] = null;
            }
          }
        });
      });
    },
    setOutWithItemsData() {
      const series = [];
      const categories = this.outWithItems.map((item) => item.description);

      this.outWithItemsLegends = categories;
      console.log(categories.length);

      this.outWithItems.forEach(({ description, values }) => {
        const dataIndex = categories.findIndex((item) => item === description);
        values.forEach(({ value, description: itemDescription }) => {
          series.push({
            name: itemDescription,
            data: [],
          });

          const idxItem = series.findIndex(
            (item) => item.name === itemDescription
          );
          for (let i = 0; i < categories.length; i++) {
            if (i === dataIndex) {
              series[idxItem].data[i] = value;
            } else {
              series[idxItem].data[i] = null;
            }
          }
        });
      });
      console.log(series);
      this.outWithItemsSeries = series;
    },
  },
  watch: {
    year() {
      this.loading = true;
    },
  },
};
