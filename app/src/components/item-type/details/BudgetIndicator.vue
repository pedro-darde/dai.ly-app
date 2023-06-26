<template>
  <div class="flex flex-col-reverse items-center">
    <div>
      <p class="text-sm ml-2">{{ percentageOverBudget }}%</p>
    </div>
    <div
      :class="['w-5 h-14 rounded-md flex flex-row-reverse border-2 items-end']"
      :style="{
        borderColor: percentageColor,
      }"
      :title="budget.amount"
    >
      <div
        :class="['inner justify-end w-5']"
        :style="{
          height:
            percentageOverBudget > 100 ? '100%' : percentageOverBudget + '%',
          backgroundColor: percentageColor,
        }"
      ></div>
    </div>
    <div>
      <p class="text-sm ml-2">{{ $filters.toMonetary(budget.amount) }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    budget: {
      type: Object,
      required: true,
    },
    totalSpent: {
      type: Number,
      required: true,
    },
  },
  computed: {
    percentageOverBudget() {
      const { amount } = this.budget;
      const percentageSpent = (Math.abs(this.totalSpent) / amount) * 100;
      return percentageSpent.toFixed(2);
    },
    percentageColor() {
      let color = "red";
      // if (this.percentageOverBudget > 0 && this.percentageOverBudget <= 50) {
      //   color = "purple";
      // }
      //
      // if (this.percentageOverBudget > 50 && this.percentageColor <= 75) {
      //   color = "yellow";
      // }
      return color;
    },
  },
  methods: {},
};
</script>
