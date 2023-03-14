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
  components: {
    Chart,
  },
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
          palette: "palette11",
          monochrome: {
            enabled: false,
            color: "#33B2DF",
            shadeTo: "dark",
            shadeIntensity: 0.65,
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          formatter(value) {
            console.log(value);
          },
        },
        chart: {
          type: "bar",
          dropShadow: {
            enabled: true,
            color: "#111",
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 3,
        },
        xaxis: {
          categories: this.legends,
        },
      },
    };
  },
};
</script>
