<template>
  <Chart
    :chart-options="chartOptions"
    :values="series"
    :type="'bar'"
    :width="500"
  />
</template>

<script>
import toMonetary from "@/filters/toMonetary";
import Chart from "./Chart.vue";
export default {
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
  components: {
    Chart,
  },

  data() {
    return {
      series: this.values,
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: this.legends,
        },
        yaxis: {
          title: {
            text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return toMonetary(val);
            },
          },
        },
      },
    };
  },
};
</script>
