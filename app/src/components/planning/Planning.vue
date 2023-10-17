<template>
  <div
    class="bg-gray-100 container w-full p-5 rounded border-l-8 flex flex-col items-start"
  >
    <form class="m-2 w-full" @submit.prevent="save">
      <div
        class="flex flex-row items-center mb-2 text-center justify-between w-full"
      >
        <div class="flex flex-row items-center">
          <a class="text-green-700 mr-1 text">
            <money />
          </a>
          <h2 class="text-3xl font-bold">Create planning of {{ year }}</h2>
        </div>
        <button
          type="submit"
          class="px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
        >
          Save
        </button>
      </div>
      <div class="max-h-[650px] overflow-auto">
        <div
          class="bg-neutral-300 rounded border-l-8 border-white p-3 mb-5 text-left"
        >
           <PlanningPreview :planning="planning" />
        </div>
        <div class="grid md:grid-cols-4 md:gap-3 mb-2">
          <Input
            label="Planning Title"
            type="text"
            v-model="planning.title"
            :required="true"
          />
          <MoneyInput
            label="Expected Amount"
            v-model="planning.expectedAmount"
            :required="true"
            :model-value="planning.expectedAmount"
          />
          <Input
            label="Start At"
            type="date"
            v-model="planning.startAt"
            :required="true"
          />
          <Input
            label="End At"
            type="date"
            v-model="planning.endAt"
            :required="false"
          />
        </div>
        <div class="grid md:grid-cols-4 md:gap-3 mb-2">
          <button
            type="button"
            class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="handleColapse()"
          >
            {{ collapseOrShowAllMonthsText }}
          </button>
        </div>
        <div class="flex flex-row items-center ml-4 mb-2">
          <a class="text-black-700 mr-1">
            <calendar />
          </a>
          <h3 class="text-2xl font-bold">Months</h3>
        </div>
        <div
          class="flex flex-col bg-gray-300 rounded border-l-8 border-gray-500 p-5 mb-5"
          v-for="(month, key) in planning.planningMonths"
          :key="key"
        >
          <div class="grid md:grid-cols-4 md:gap-3 mb-2 items-end ml-4">
            <Select
              label="Month"
              type="text"
              v-model="month.idMonth"
              optionValue="id"
              optionText="monthName"
              :options="getMonthOptions(month)"
              :required="true"
            />
            <MoneyInput label="Credit status" v-model="month.creditStatus" :model-value="month.creditStatus" />

            <div class="flex flex-row gap-2 items-center">
              <button
                type="button"
                class="text-blue-400 ml-2 font-mono hover:font-bold"
                @click="month.toggledGoals = !month.toggledGoals"
                v-if="!!planning.id"
              >
                Add goals
              </button>
              <button
                type="button"
                @click="addMonth(month)"
                title="Adicionar Mês"
                class="text-lg"
                v-if="isLastMonth(month.id)"
              >
                <plus />
              </button>
              <button
                v-if="canRemove()"
                type="button"
                @click="removeMonth(month.id)"
                title="Remove Mês"
                class="text-lg text-red-500"
              >
                <remove />
              </button>
              <button
                type="button"
                class="text-lg"
                @click="month.hidden = !month.hidden"
              >
                <button
                  type="button"
                  class="transition ease-in duration-100"
                  :class="{ '-rotate-180': !month.hidden }"
                >
                  <ArrowDown />
                </button>
              </button>
            </div>
          </div>
          <PlanningMonthGoals
            :idPlanningMonth="month.id"
            :currentGoals="month.goals"
            :currentBudgets="month.budgets"
            v-if="month.toggledGoals && !!planning.id"
            @isVisible="handlePopup(month)"
          />
          <div class="flex flex-col items-start ml-8" v-if="!month.hidden">
            <div class="mb-2 border rounded-sm p-2">
              <div class="flex flex-row gap-2 items-center justify-center">
                <h1 class="text-xl font-bold">Filters</h1>
                                <font-awesome-icon icon="fa-solid fa-filter" />
              </div>

              <div class="grid md:gap-3 md:grid-cols-3">
                <Input
                  label="Description"
                  placeholder="Enter item description here"
                  v-model="month.searchTerm"
                  :required="false"
                  v-if="!month.hidden"
                  @input="onInputSearch($event, month)"
                />
                <Treeselect
                  placeholder="Type"
                  v-model="month.searchType"
                  :options="itemTypes"
                  v-if="!month.hidden"
                  label="Type"
                  :required="false"
                  @input="onInputSearch($event, month, 'idType')"/>
                <Select
                  v-model="month.searchPaymentType"
                  label="Payment Method"
                  optionText="name"
                  optionValue="value"
                  v-if="!month.hidden"
                  :required="false"
                  :options="paymentMethods"
                  @input="onInputSearch($event, month, 'paymentMethod')"
                />
              </div>
            </div>
            <div class="flex flex-row">
              <a class="text-black-700 mr-1">
                <char />
              </a>
              <h3 class="text-lg font-bold">Moviments</h3>
            </div>
          </div>

          <TransitionGroup mode="out-in" class="max-h-96 overflow-auto">
            <div
              class="flex flex-col bg-gray-700 rounded border-l-8 border-white p-5 mb-5 text-white ml-8"
              v-for="(item, key) in month.items"
              :key="key"
            >
              <div
                v-if="!item.hidden && !month.hidden"
                :class="[
                  'grid  md:gap-3 mb-2 items-end',
                  item.operation == 'out' ? 'md:grid-cols-8' : 'md:grid-cols-7',
                ]"
              >
                <MoneyInput
                  label="Value"
                  v-model="item.value"
                  :required="true"
                  :model-value="item.value"
                />
                <Input
                  label="Description"
                  type="text"
                  v-model="item.description"
                  :required="true"
                />
                <Treeselect
                  placeholder="Type"
                  v-model="item.idType"
                  :required="true"
                  :options="itemTypes"
                  label="Type"
                />
                <Select
                  label="Operation"
                  type="text"
                  v-model="item.operation"
                  optionValue="value"
                  optionText="name"
                  :options="operations"
                  :required="true"
                />
                <Select
                  v-model="item.paymentMethod"
                  label="Payment Method"
                  optionText="name"
                  optionValue="value"
                  :options="paymentMethods"
                  v-if="item.operation == 'out'"
                  :required="item.operation == 'out'"
                />
                <Select
                  v-model="item.idCard"
                  label="Card"
                  optionText="cardName"
                  optionValue="id"
                  :options="cards"
                  :required="false"
                />
                <Input
                  label="Date"
                  type="date"
                  v-model="item.date"
                  :required="true"
                />

                <div class="flex flex-row">
                  <button
                    v-if="isLastItem(month, item.id)"
                    type="button"
                    @click="addItem(month)"
                    title="Adicionar Mês"
                    class="text-lg"
                  >
                    <plus />
                  </button>
                  <button
                    v-if="canRemove()"
                    type="button"
                    @click="removeItem(month, item.id)"
                    title="Remove Item"
                    class="text-lg text-red-500"
                  >
                    <remove />
                  </button>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </form>
  </div>
</template>


<script setup>
import money from "../icons/money.vue";
import calendar from "../icons/calendar.vue";
import Input from "../input/Input.vue";
import MoneyInput from "../money-input/MoneyInput.vue";
import { toHtmlDateTimeFormat } from "@/helpers/DateFormatter";
import quickid from "@/helpers/quickid";
import plus from "../icons/plus.vue";
import Select from "../select/Select.vue";
import char from "../icons/char.vue";
import remove from "../icons/remove.vue";
import ArrowDown from "../icons/arrow-down.vue";
import Treeselect from "../treeselect/Treeselect.vue";
import PlanningMonthGoals from "../planning/Goals/PlanningMonthGoals.vue";
import { usePlanningCalculator } from "@/mixins/PlanningCalculator"
import { ref, computed, onUnmounted, watchEffect, watch } from "vue";
import { useStore } from "vuex";
import tree from 'vue3-treeselect'
import {useSwal} from "@/mixins/SwalMixin";
import PlanningPreview from "@/components/planning-preview/PlanningPreview.vue";
const $store = useStore()
const operations = [
  {
    name: "In (+)",
    value: "in",
  },
  {
    name: "Out (-)",
    value: "out",
  },
];

const monthsToRemove = ref([])
const itemsToRemove = ref([])


const {  toastError } = useSwal()
const {
  spentOnDebitMonth,
  spentOnCreditMonth,
} = usePlanningCalculator()
const paymentMethods = [
  { name: "Debit", value: "debit" },
  { name: "Credit", value: "credit" },
];

const itemTypes = computed(() => {
  return $store.getters["planning/itemTypesGetter"];
})

const months = computed(() => {
  return $store.getters["planning/monthGetter"];
})

const cards = computed(() => {
  return $store.getters["planning/cardsGetter"];
})

const planning = computed({
    set(value) {
      $store.dispatch("planning/applyCurrentPlanning", value);
    },
    get() {
      return $store.state.planning.planning;
    },
})

const onEdit = computed(() => {
    return (
      planning.value.hasOwnProperty("id") &&
      isIdFromDB(planning.value ?? { id: null })
    );
});


onUnmounted(() => {
  $store.dispatch("planning/applyDefaultPlanning");
})

watch(planning, (value) => {
  planning.value = value;
})

// const { visible, disband } = usePopup();
const { in: inExpent , out } = usePlanningCalculator()

const { year } = defineProps({
  year: {
    required: true,
    type: Number
  }
})

const currentMonthGoals = ref([]);
const currentMonthItems = ref([]);

const addMonth = (month) => {
  planning.value.planningMonths.push({
    hidden: false,
    id: quickid(),
    idMonth: month.idMonth + 1,
    items: [
      {
        idPlanningMonth: month.id,
        id: quickid(),
        value: 0,
        operation: "out",
        date: toHtmlDateTimeFormat(new Date()),
        paymentMethod: "credit",
      },
    ],
    goals: {
      id: quickid(),
      idPlanningMonth: null,
      moneyToSave: 0,
      creditLimit: 0,
    },
    budgets: [
      {
        id: quickid(),
        type: null,
        planningMonth: null,
        amount: 0,
      },
    ],
  });
};

const removeMonth = (id) => {
  if (planning.value.planningMonths?.length === 1) {
    toastError("Keep at least one month to the planning");
    return;
  }

  if (onEdit.value) {
    const month = planning.value.planningMonths.find((item) => item.id === id);
    if (isIdFromDB(month)) {
      monthsToRemove.value.push(id);
      itemsToRemove.value.push([
        ...month.items.filter(isIdFromDB).map(({ id }) => id),
      ]);
    }
  }
  planning.value.planningMonths = planning.value.planningMonths.filter(
    (item) => item.id !== id
  );
};

const monthColapsed = ref(false)

const collapseOrShowAllMonthsText = computed(() => {
  return monthColapsed.value
    ? "Show all months"
    : "Collapse all months";
});

const addItem = (month) => {
  month.items.push({
    idPlanningMonth: month.id,
    id: quickid(),
    value: 0,
    operation: "out",
    date: toHtmlDateTimeFormat(new Date()),
    paymentMethod: "debit",
    description: "",
    idType: null,
    idCard: null,
  });
};

const handleColapse = () => {
  monthColapsed.value = !monthColapsed.value;
  planning.value.planningMonths.forEach((month) => {
    month.hidden = monthColapsed.value;
  });
}

const removeItem = (month, idItem) => {
  if (month.items?.length === 1) {
    toastError("Keep at least one item to your month.");
    return;
  }

  const item = month.items.find((item) => item.id === idItem);

  if (onEdit.value && isIdFromDB(item)) {
    itemsToRemove.value.push(item.id);
  }
  month.items = month.items.filter((item) => item.id !== idItem);
};

const isLastMonth = (id) => {
  const index = planning.value.planningMonths.findIndex(
    (item) => item.id === id
  );
  return index === planning.value.planningMonths.length - 1;
};

const isLastItem = (month, id) => {
  const index = month.items.findIndex((item) => item.id === id);
  return index === month.items.length - 1;
};

const getMonthOptions = (month) => {
  const idsMonth = months.value
    .filter((item) => item.id !== month.id)
    .map((month) => month.idMonth);
  return months.value.filter((item) => !idsMonth.includes(item.id));
};

const save = async () => {
  let payload = {
    id: planning.value.id,
    title: planning.value.title,
    startAt: planning.value.startAt,
    endAt: planning.value.endAt,
    year: year,
    expectedAmount: planning.value.expectedAmount,
    months: planning.value.planningMonths.map((month) => ({
      ...month,
      totalIn: inExpent(month),
      totalOut: out(month),
      spentOnDebit: spentOnDebitMonth(month),
      spentOnCredit: spentOnCreditMonth(month),
    })),
  };

  let action = "createPlanning";
  console.log(onEdit)
  console.log(planning.value)
  if (onEdit.value) {
    action = "editPlanning";
    payload.months = makeToUpAdd(planning.value.planningMonths);
  }
  await $store.dispatch(`planning/${action}`, {
    ...payload,
    monthsToRemove: monthsToRemove.value,
    itemsToRemove: itemsToRemove.value,
  });
  await $store.dispatch("planning/changePlanningYear", year);
};

const isIdFromDB = ({ id }) => {
  return !!id && !isNaN(+id);
};

const canRemove = (key) => {
  if (onEdit.value) return true;
  return key != 0;
};

const toggleSelection = () => {};

const makeToUpAdd = (array, onMonth = true) => {
  return array.reduce(
    (acc, current, index) => {
      const isOnDb = !isNaN(+current.id);
      let copy = { ...current };
      if (copy.typesSpent) {
        delete [copy.typesSpent];
      }
      if (onMonth) {
        Object.assign(copy, {
          totalIn: inExpent(copy),
          totalOut: out(copy),
          spentOnDebit: spentOnDebitMonth(copy),
          spentOnCredit: spentOnCreditMonth(copy),
          items: makeToUpAdd(copy.items, false),
        });
      }
      const key = isOnDb ? "toUpdate" : "toAdd";
      acc[key].push(copy);
      return acc;
    },
    { toAdd: [], toUpdate: [] }
  );
};

const onInputSearch = ($event, month, field = "description") => {
  if (!$event) {
    month.items.forEach((item) => {
      item.hidden = false;
    });
    return;
  }
  month.items.forEach((item) => {
    if (typeof item[field] === "string") {
      item.hidden = !item[field]?.match($event);
    } else {
      item.hidden = item[field] !== $event;
    }
  });
};

const handlePopup = month => {
  month.toggledGoals = false
}
</script>
<style scoped lang="scss">
.item-3 {
  grid-column: span-2;
}
</style>
