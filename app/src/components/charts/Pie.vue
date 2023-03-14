<template>
  <Chart
    :chart-options="chartOptions"
    :values="series"
    :type="'donut'"
    :width="350"
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
      series: this.onlyWithMoreThanZeroValues(),
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
          enabled: true,
          theme: "dark",
          y: {
            show: true,
            formatter: (value) => toMonetary(value),
          },
        },
        chart: {
          type: "donut",
          dropShadow: {
            enabled: true,
            color: "#111",
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2,
          },
        },
        stroke: {
          width: 2,
        },
        plotOptions: {
          pie: {
            expandOnClick: true,
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                  formatter({ config }) {
                    const total = config.series.reduce(
                      (acc, current) => (acc += +current),
                      0
                    );
                    return toMonetary(total);
                  },
                },
              },
            },
          },
        },
        labels: this.onlyWithValueLabels(),
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8,
          },
        },
        stroke: {
          width: 1,
        },
        title: {
          text: this.title,
        },
        legend: {
          showForSingleSeries: true,
        },
      },
    };
  },
  methods: {
    onlyWithValueLabels() {
      return this.legends.filter((_, index) => this.values[index] > 0);
    },
    onlyWithMoreThanZeroValues() {
      return this.values.filter((value) => value > 0);
    },
  },
};
</script>
