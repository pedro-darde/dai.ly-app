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
<script setup>

import {useFilters} from "@/filters";
import {computed} from "vue";
const $filters = useFilters()
const props = defineProps({
  budget: {
    type: Object,
    required: true,
  },
  totalSpent: {
    type: Number,
    required: true,
  },
})

const percentageOverBudget = computed(() => {
  const { amount } = props.budget;
  const percentageSpent = (Math.abs(props.totalSpent) / amount) * 100;
  console.log(props.totalSpent, amount, percentageSpent)
  return percentageSpent.toFixed(2);
});

const percentageColor = computed(() => {
  let color = "purple";
  // if (percentageOverBudget.value > 0 && percentageOverBudget.value <= 50) {
  //   color = "purple";
  // }
  //
  // if (percentageOverBudget.value > 50 && percentageColor.value <= 75) {
  //   color = "yellow";
  // }
  return color;
});
</script>
