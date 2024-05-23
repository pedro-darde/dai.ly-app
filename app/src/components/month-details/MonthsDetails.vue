<template>
<!--  <Transition name="fade">-->
    <RawPopup v-if="visible" @disband="customDisband">
      <div class="mb-5 p-2" v-for="month in monthsGroupped">
        <div class="d-flex flex-col">
          <h3 class="text-bold text-2xl p-5 font-mono">
            {{ month.monthName }} Stats
          </h3>
          <div class="flex flex-row items-center MonthDetails">
            <div class="bg-white p-5 rounded border-l-8">
              <div class="flex flex-col">
                <h3 class="text-xl font-bold">Balance</h3>
                <p
                  :class="[
                    'text-xl font-bold',
                    month.balance >= 0 ? 'text-green-300' : 'text-red-400',
                  ]"
                >
                  {{ $filters.toMonetary(month.balance) }}
                </p>
              </div>
            </div>

            <div class="bg-white p-5 rounded border-l-8">
              <h3 class="text-xl font-bold">Spent On Credit</h3>
              <p class="text-xl font-bold text-red-400">
                {{ $filters.toMonetary(month.spentOnCredit) }}
              </p>
            </div>
            <div class="bg-white p-5 rounded border-l-8">
              <h3 class="text-xl font-bold">Spent On Debit</h3>
              <p class="text-xl font-bold text-red-400">
                {{ $filters.toMonetary(month.spentOnDebit) }}
              </p>
            </div>
            <button
              v-if="!!month.typesSpent"
              type="button"
              @click="handleMonthDetails(month)"
              class="rounded-2xl p-5 text-blue-900 ml-1 text-2xl"
              title="See Details"
            >
              +
            </button>
          </div>
          <Transition name="fade">
            <Details
              v-if="month.showItemDetails"
              :details="month.typesSpent"
              :items="month.items"
            />
          </Transition>
        </div>
      </div>
    </RawPopup>
<!--  </Transition>-->
</template>

<script setup>

import  {usePlanningCalculator} from "@/mixins/PlanningCalculator";
import { popupVisibility } from "@/mixins/Popup";
import { useStore } from "vuex";
import RawPopup from "../popup/RawPopup.vue";
import Details from "../item-type/details/Details.vue";
import {computed, defineEmits, ref, watch} from "vue";
import {useFilters} from "@/filters";

const $filters  = useFilters()

const props = defineProps({
  planningMonths: {
    required: true,
    type: Array,
  },
})

const {
  spentOnDebitMonth,
  spentOnCreditMonth,
    out,
    in: inExpent,
    monthBalance
} = usePlanningCalculator()

const $store = useStore()
// const $filters =

const monthsDB = computed(() => {
  return $store.getters["planning/monthGetter"];
});

const monthsGroupped = ref( props.planningMonths.map((month) => ({
  ...month,
  monthName: monthsDB.value.find((item) => item.id === month.idMonth)
      ?.monthName,
  balance: monthBalance(month),
  In: inExpent(month),
  Out: out(month),
  spentOnDebit: spentOnDebitMonth(month),
  spentOnCredit: spentOnCreditMonth(month),
})))
const handleMonthDetails = (month) => {
  if (!month.typesSpent) {
    return;
  }
  month.showItemDetails = !month.showItemDetails;
}

const emit = defineEmits(["isVisible"]);
const { visible, disband } = popupVisibility(emit);

const customDisband = () => {
  monthsGroupped.value = []
  disband()
}
</script>

<style scoped lang="scss">
.MonthDetails {
  text-align: center !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
