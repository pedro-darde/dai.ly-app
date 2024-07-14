<template>
  <div class="mb-5">
    <h3 class="text-bold text-2xl p-5 font-mono">Planning Stats</h3>
    <div class="flex flex-row items-center justify-start flex-wrap gap-2">
      <div class="bg-gray-400 p-5 rounded border-l-8">
        <div class="flex flex-row gap-4 items-center">
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
          <font-awesome-icon
            icon="scale-balanced"
            size="2xl"
            style="cursor: pointer"
          />
        </div>
      </div>
      <div class="bg-gray-400 p-5 rounded border-l-8">
        <div class="flex flex-row gap-4 items-center">
          <div class="flex flex-col">
            <h3 class="text-xl font-bold">In</h3>
            <p class="text-xl font-bold text-green-300">
              {{ $filters.toMonetary(planningIn) }}
            </p>
          </div>
          <font-awesome-icon
            icon="arrow-trend-up"
            size="2xl"
            color="green"
            style="cursor: pointer"
          />
        </div>
      </div>
      <div class="bg-gray-400 p-5 rounded border-l-8">
        <div class="flex flex-row gap-4 items-center">
          <div class="flex flex-col">
            <h3 class="text-xl font-bold">Out</h3>
            <p class="text-xl font-bold text-red-400">
              {{ $filters.toMonetary(planningOut) }}
            </p>
          </div>
          <font-awesome-icon
            icon="arrow-trend-down"
            size="2xl"
            color="red"
            style="cursor: pointer"
          />
        </div>
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
        <button
          class="text-blue-400 ml-2 font-mono hover:font-bold"
          @click="seeMonthsDetails"
          type="button"
        >
          View months stats
        </button>
      </div>
    </div>
    <MonthsDetails
      v-if="popupMonthsDetailsVisible"
      :planningMonths="planning.planningMonths"
      @isVisible="togglePopup"
    />
  </div>
</template>

<script setup>
import { usePopup } from "@/mixins/Popup";
import MonthsDetails from "../month-details/MonthsDetails.vue";
import { ref, computed } from "vue";
import { usePlanningCalculator } from "@/mixins/PlanningCalculator";
import { useFilters } from "@/filters";
import svgFinancesUp from "@/assets/finances-stats-bars-graphic-with-up-arrow.svg";
const $filters = useFilters();

const props = defineProps({
  planning: {
    type: Object,
    required: true,
  },
});
const { togglePopup, toggled: popupMonthsDetailsVisible } =
  usePopup("monthsDetails");
const {
  monthBalance,
  spentOnCreditMonth,
  spentOnDebitMonth,
  out,
  investiment,
} = usePlanningCalculator();

const planningBalance = computed(() => {
  const itemsBalance = props.planning.planningMonths.reduce((acc, month) => {
    // console.log(month)
    return acc + monthBalance(month);
  }, 0);

  const investimentAmount = props.planning.planningMonths.reduce(
    (acc, month) => {
      // console.log(month)
      return acc + investiment(month);
    },
    0
  );

  return itemsBalance + investimentAmount;
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
  let total = 0;
  for (const month of props.planning.planningMonths) {
    total += out(month);
  }
  return total;
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
