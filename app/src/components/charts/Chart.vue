<template>
  <div id="chart">
    <ApexChart
      :type="type"
      :width="width"
      :options="chartOptions"
      :series="values"
    ></ApexChart>
  </div>
</template>

<script>
import ApexChart from "vue-apexcharts";
export default {
  components: {
    ApexChart,
  },
  props: {
    values: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "pie",
    },
    width: {
      type: Number,
      required: true,
      default: 380,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
  },
};
</script>
