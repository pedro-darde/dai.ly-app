<template>
  <div class="container mt-2 p-2">
    <h2 class="font-bold text-center mb-2">Spents by Type</h2>
    <div>
      <BodyDetails :items="items" :details="details" />
    </div>
    <div class="flex flex-col items-end">
      <div class="flex flex-row items-center">
        <span class="font-bold text-right px-6 py-3 text-base"> Total In </span>
        <span class="text-center text-green-500 font-bold">
          + {{ toMonetary(totalIn) }}
        </span>
      </div>
      <div class="flex flex-row items-center">
        <span colspan="3" class="font-bold text-right px-6 py-3 text-base">
          Total Out
        </span>
        <span class="text-center text-red-500 font-bold">
          - {{ toMonetary(totalOut) }}
        </span>
      </div>
      <div class="flex flex-row items-center">
        <span class="font-bold text-right px-6 py-3 text-base"></span>
        <span class="font-bold">= {{ toMonetary(balance) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import BodyDetails from "./BodyDetails.vue";
import { computed } from "vue";
import { useFilters } from "@/filters";

const { toMonetary } = useFilters();

const props = defineProps({
  details: {
    required: true,
    type: Array,
  },
  items: {
    type: Array,
  },
});

function getTotalForNestedChildren(children, inOrOut) {
  let total = 0;
  for (const child of children) {
    console.log(child.spents);
    total += child?.spents
      .filter(
        (item) => item.operation === inOrOut && item.payment_method !== "credit"
      )
      .reduce((acc, { value }) => (acc += value), 0);
    if (child.children) {
      total += getTotalForNestedChildren(child.children, inOrOut);
    }
  }
  return total;
}

const totalIn = computed(() => {
  return getTotalForNestedChildren(props.details, "in");
});

const totalOut = computed(() => {
  return getTotalForNestedChildren(props.details, "out");
});

const balance = computed(() => {
  return totalIn.value - totalOut.value;
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
