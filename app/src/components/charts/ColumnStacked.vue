<template>
  <Chart
    :chart-options="chartOptions"
    :values="series"
    :type="'bar'"
    :width="500"
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
          palette: "palette5",
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
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
            type: "x",
            autoScaleYaxis: false,
            zoomedArea: {
              fill: {
                color: "#90CAF9",
                opacity: 0.4,
              },
              stroke: {
                color: "#0D47A1",
                opacity: 0.4,
                width: 1,
              },
            },
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                show: true,
              },
            },
          },
        },
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8,
          },
          formatter(t) {
            if (!t) return "";
            return toMonetary(t);
          },
        },
        xaxis: {
          categories: this.legends,
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
    };
  },
};
</script>
