<template>
  <Chart
    :values="series"
    :chart-options="chartOptions"
    type="bar"
    :width="350"
  ></Chart>
</template>

<script>
import toMonetary from "@/filters/toMonetary";
import Chart from "./Chart.vue";
export default {
  components: { Chart },
  props: {
    values: {
      type: Array,
      required: true,
    },
    legends: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      series: this.values,

      chartOptions: {
        theme: {
          mode: "dark",
          palette: "palette4",
          monochrome: {
            enabled: false,
            color: "#33B2DF",
            shadeTo: "dark",
            shadeIntensity: 0.65,
          },
        },
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
          formatter(total) {
            return toMonetary(total);
          },
        },
        xaxis: {
          categories: this.legends,
        },
      },
    };
  },
};
</script>
