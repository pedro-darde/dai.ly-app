<template>
  <div class="mb-5">
    <h3 class="text-bold text-2xl p-5 font-mono">Planning Stats</h3>
    <div class="flex flex-row items-center justify-start flex-wrap gap-2">
      <div class="bg-gray-400 p-5 rounded border-l-8">
        <div class="flex flex-col">
          <h3 class="text-xl font-bold">Balance</h3>
          <p
            :class="[
              'text-xl font-bold',
              planningBalance >= 0 ? 'text-green-300' : 'text-red-400',
            ]"
          >
            {{ $filters.toMonetary(planningBalance) }}
          </p>
        </div>
      </div>
      <div class="bg-gray-400 p-5 rounded border-l-8">
        <h3 class="text-xl font-bold">In</h3>
        <p class="text-xl font-bold text-green-300">
          {{ $filters.toMonetary(planningIn) }}
        </p>
      </div>
      <div class="bg-gray-400 p-5 rounded border-l-8">
        <h3 class="text-xl font-bold">Out</h3>
        <p class="text-xl font-bold text-red-400">
          {{ $filters.toMonetary(planningOut) }}
        </p>
      </div>
      <div class="bg-gray-400 p-5 rounded border-l-8">
        <h3 class="text-xl font-bold">Spent On Credit</h3>
        <p class="text-xl font-bold text-red-400">
          {{ $filters.toMonetary(spentOnCredit) }}
        </p>
      </div>
      <div class="bg-gray-400 p-5 rounded border-l-8">
        <h3 class="text-xl font-bold">Spent On Debit</h3>
        <p class="text-xl font-bold text-red-400">
          {{ $filters.toMonetary(spentOnDebit) }}
        </p>
      </div>
      <div class="bg-gray-400 p-5 rounded border-l-8">
        <h3 class="text-xl font-bold">Expected - Balance</h3>
        <p
          :class="[
            'text-xl font-bold',
            planningBalance - planning.expectedAmount >= 0
              ? 'text-green-300'
              : 'text-red-400',
          ]"
        >
          {{ $filters.toMonetary(planningBalance - planning.expectedAmount) }}
        </p>
      </div>
      <div>
        <a
          class="text-blue-400 ml-2 font-mono hover:font-bold"
          href="#"
          @click="seeMonthsDetails"
        >
          View months stats
        </a>
      </div>
    </div>
    <MonthsDetails
      v-model="popupMonthsDetailsVisible"
      :planningMonths="planning.planningMonths"
      @isVisible="handlePopup"
    />
  </div>
</template>

<script setup>
import { usePopup } from "@/mixins/Popup";
import MonthsDetails from "../month-details/MonthsDetails.vue";
import { ref, computed } from "vue";


const props = defineProps({
  planning: {
      type: Object,
      required: true,
    },
})
const { togglePopup } = usePopup("monthsDetails");
console.log(props.planning);
const planningBalance = computed(() => {
  return props.planning.planningMonths.reduce((acc, month) => {
    return acc + monthBalance(month);
  }, 0);
});

const planningIn = computed(() => {
  return props.planning.planningMonths.reduce((acc, planning) => {
    return (
      acc +
      planning.items.reduce((accPlanning, item) => {
        if (item.operation === "in") {
          return accPlanning + item.value;
        }
        return accPlanning;
      }, 0)
    );
  }, 0);
});

const planningOut = computed(() => {
  return props.planning.planningMonths.reduce((acc, planning) => {
    return (
      acc +
      planning.items.reduce((accPlanning, item) => {
        if (item.operation === "out") {
          return accPlanning + item.value;
        }
        return accPlanning;
      }, 0)
    );
  }, 0);
});

const spentOnDebit = computed(() => {
  return props.planning.planningMonths.reduce((acc, month) => {
    return acc + spentOnDebitMonth(month);
  }, 0);
});

const spentOnCredit = computed(() => {
  return props.planning.planningMonths.reduce((acc, month) => {
    return acc + spentOnCreditMonth(month);
  }, 0);
});

const handlePopup = (value) => {
  togglePopup(value);
};

const seeMonthsDetails = () => {
  togglePopup(!popupMonthsDetailsVisible.value);
};
</script>

