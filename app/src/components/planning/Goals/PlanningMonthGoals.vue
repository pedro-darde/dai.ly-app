<template>
  <RawPopup @disband="disband" v-if="visible">
    <div class="container p-5">
      <div class="flex flex-col items-center">
        <div>
          <h1 class="text-xl font-bold">Budget types</h1>
          <div class="grid md:grid-cols-3 md:gap-3 items-end" v-for="budget in budgets">
            <Treeselect :disabled="budget.isOnDB" label="Type" v-model="budget.type" :options="itemTypes"
              :append-to-body="true" />
            <MoneyInput v-model="budget.amount" label="Amount" @change="change" :model-value="budget.amount" />
            <div class="flex flex-row gap-2 items-center">
              <button type="button" @click="addBudget" title="Add budget" class="text-lg"
                v-if="isLastBudget(budget.id)">
                <plus />
              </button>
              <button type="button" @click="removeBudget(budget.id)" title="Remove budget" class="text-lg text-red-500">
                <remove />
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-end items-end mt-5 w-full">
          <button @click="save" class="p-3 bg-green-500 rounded-md text-white font-bold hover:bg-green-300"
            type="button">
            Save
          </button>
        </div>
      </div>
    </div>
  </RawPopup>
</template>
<script setup>
import RawPopup from "../../popup/RawPopup.vue";
import { popupVisibility } from "@/mixins/Popup";
import MoneyInput from "../../money-input/MoneyInput.vue";
import Treeselect from "../../treeselect/Treeselect.vue";
import plus from "../../icons/plus.vue";
import remove from "../../icons/remove.vue";
import { useSwal } from "@/mixins/SwalMixin";
import quickid from "@/helpers/quickid";
import { goalsService } from "@/services/GoalsService";
import { ref, computed, defineProps } from "vue";
import { useStore } from "vuex";
const $store = useStore();
const change = (e) => {
  console.log("mudou o valor")
}
const valueTeste = ref(0)
const props =
  defineProps({
    idPlanningMonth: {
      type: String,
      required: true,
    },
    currentBudgets: {
      type: Array,
      default: () => [],
    },
  })

const { visible, disband } = popupVisibility();
const { toastError } = useSwal()

const currentBudgets = ref(props.currentBudgets || []);
const budgets = ref(
  currentBudgets.value.length
    ? JSON.parse(JSON.stringify(currentBudgets.value))
    : [
      {
        planningMonth: props.idPlanningMonth,
        type: null,
        amount: 0,
        id: quickid(),
        isOnDB: false,
      },
    ]
);

const itemTypes = computed(() => $store.state.planning.itemTypes);

const addBudget = () => {
  budgets.value.push({
    id: quickid(),
    planningMonth: props.idPlanningMonth,
    type: null,
    amount: 0,
    isOnDB: false,
  });
};

const removeBudget = (budgetId) => {
  budgets.value = budgets.value.filter(({ id }) => id !== budgetId);
};

const save = async () => {
  const budgetCounts = budgets.value.reduce((acc, item) => {
    if (!item.type) return {};
    if (!acc[item.type]) {
      acc[item.type] = 0;
    }
    acc[item.type] += 1;
    return acc;
  }, {});
  if (Object.values(budgetCounts).some((count) => count > 1)) {
    toastError("There are some budgets with the same Type, please verify.");
    return;
  }

  try {
    const data = {
      budgets: budgets.value,
    };
    await goalsService.save(data);
    toastSuccess("Goals created");
    disband();
  } catch (e) {
    toastError("Error while creating.");
  }
};

const isLastBudget = (id) => {
  // console.log(budgets.value)
  const index = budgets.value.findIndex((item) => item.id === id);
  console.log(index, budgets.value.length - 1)
  return index === budgets.value.length - 1;
};
</script>
