<template>
  <div class="bg-gray-100 container w-full p-5 rounded border-l-8 flex flex-col items-start">
    <form class="m-2 w-full" @submit.prevent="save">
      <div class="flex flex-row items-center mb-2 text-center justify-between w-full">
        <div class="flex flex-row items-center">
          <a class="text-green-700 mr-1 text">
            <money />
          </a>
          <h2 class="text-3xl font-bold">Planning of {{ year }}</h2>
        </div>
        <button type="submit"
          class="px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300">
          Save
        </button>
      </div>
      <div class="max-h-[650px] overflow-auto">

        <div class="flex flex-row gap-3 w-100 mb-2 justify-center items-end">

          <Input class="grow" label="Planning Title" type="text" v-model="planning.title" :required="true" />
          <MoneyInput class="grow" label="Expected Amount" v-model="planning.expectedAmount" :required="true"
            :model-value="planning.expectedAmount" />
          <Input class="grow" label="Start At" type="date" v-model="planning.startAt" :required="true" />
          <Input class="grow" label="End At" type="date" v-model="planning.endAt" :required="false" />
          <button @click="createEditItem" type="button"
            class="grow px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 flex items-center justify-center">
            Create Moviment &nbsp;
            <plus />
          </button>
        </div>
        <div class="bg-neutral-300 rounded border-l-8 border-white p-3 mb-5 text-left">
          <PlanningPreview :planning="planning" />
        </div>
        <div class="flex flex-row items-center ml-4 mb-2 gap-2">
          <a class="text-black-700 mr-1">
            <calendar />
          </a>
          <h3 class="text-2xl font-bold">Moviments</h3>

        </div>
        <div class="grid md:grid-cols-3 md:gap-3">
          <Select label="Month" type="text" optionValue="id" optionText="monthName" :options="months" class="col-span-2"
            v-model="monthMoviments" :required="true" />
          <button type="button" @click="openBudgets" class="px-3 py-2   text-center text-white font-bold text-xl  bg-blue-400 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
             Month budgets 
            </button>
          <PlanningMonthGoals :idPlanningMonth="monthMoviments"
            :currentBudgets="currentMonthBudgets" v-if="popupBudgets" @isVisible="toggleBudgets" />
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded mt-5">
          <thead class="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" class="px-6 py-3">Value</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th scope="col" class="px-6 py-3">Type</th>
              <th scope="col" class="px-6 py-3">Operation</th>
              <th scope="col" class="px-6 py-3">Payment Method</th>
              <th scope="col" class="px-6 py-3">Card</th>
              <th scope="col" class="px-6 py-3">Date</th>
              <th colspan="2" class="px-6 py-3"> Actions </th>
            </tr>
          </thead>
          <tbody class="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 dark:text-white font-bold">
            <tr v-for="month in monthItems" :key="month.id">
              <td class="px-6 py-4">
                {{ $filters.toMonetary(month.value) }}
              </td>
              <td class="px-6 py-4">
                {{ month.description }}
              </td>
              <td class="px-6 py-4">
                {{ itemTypes.find(item => item.id === month.idType)?.description }}
              </td>
              <td class="px-6 py-4">
                {{ month.operation }}
              </td>
              <td class="px-6 py-4">
                {{ month.paymentMethod }}
              </td>
              <td class="px-6 py-4">
                {{ month.idCard }}
              </td>
              <td class="px-6 py-4">
                {{ month.date }}
              </td>
              <td coslpan="2">
                  <div class="flex flex-row gap-2">
                    <font-awesome-icon icon="pencil"  size="xl" style="cursor: pointer" />
                    <a @click="removeItem(month.id)">
                      <font-awesome-icon icon="trash"  size="xl" color="red"   /> 
                    </a>
                  </div>
              </td>
            </tr>
          </tbody>
        </table>
     
      </div>
      <CreateEditMoviment :planning="planning" v-if="popupMoviments" @isVisible="togglePopup" @addMonth="addItem" />
    </form>

  </div>
</template>


<script setup>
import money from "../icons/money.vue";
import calendar from "../icons/calendar.vue";
import Input from "../input/Input.vue";
import MoneyInput from "../money-input/MoneyInput.vue";
import quickid from "@/helpers/quickid";
import plus from "../icons/plus.vue";
import Select from "../select/Select.vue";
import PlanningMonthGoals from "../planning/Goals/PlanningMonthGoals.vue";
import { usePlanningCalculator } from "@/mixins/PlanningCalculator"
import { ref, computed, onUnmounted, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useSwal } from "@/mixins/SwalMixin";
import PlanningPreview from "@/components/planning-preview/PlanningPreview.vue";
import { usePopup } from "@/mixins/Popup";
import CreateEditMoviment from "@/components/planning/Moviments/CreateEditMoviment.vue";
import { useFilters } from "@/filters";
const $store = useStore()
const monthMoviments = ref((new Date()).getMonth() + 1)

const monthsToRemove = ref([])
const itemsToRemove = ref([])

const { togglePopup, toggled: popupMoviments } = usePopup("addMoviment");
const { togglePopup: toggleBudgets, toggled: popupBudgets } = usePopup("budgets")

const { showConfirm, toastSuccess } = useSwal()
const {
  spentOnDebitMonth,
  spentOnCreditMonth,
} = usePlanningCalculator()

const itemTypes = computed(() => {
  return $store.getters["planning/itemTypesGetter"];
})

const openBudgets = () => {
  const currentMonth = planning.value.planningMonths.find(
    (month) => month.idMonth === monthMoviments.value
  );

  currentMonthBudgets.value = currentMonth?.budgets ?? []
  toggleBudgets()
}

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

const monthItems = computed(() => {
  return planning.value.planningMonths.filter(
    (month) => month.idMonth === monthMoviments.value
  ).map((month) => month.items).flat();
});

const onEdit = computed(() => {
  return (
    planning.value.hasOwnProperty("id") &&
    isIdFromDB(planning.value ?? { id: null })
  );
});

onMounted(() => {
  $store.dispatch("planning/changePlanningYear", year);
})

onUnmounted(() => {
  $store.dispatch("planning/applyDefaultPlanning");
})

watch(planning, (value) => {
  planning.value = value;
})

// const { visible, disband } = usePopup();
const { in: inExpent, out } = usePlanningCalculator()
const $filters = useFilters()

const { year } = defineProps({
  year: {
    required: true,
    type: Number
  }
})

const currentMonthBudgets = ref([]);

const addItem = async (month, saveAndNew)  => {
  const itemDateParsed = new Date(month.date + 'T00:00')
  const newMoviment = {
    ...month,
    idPlanningMonth: months.value[itemDateParsed.getMonth()].id
  }
  const currentMonth = planning.value.planningMonths.find(
    (month) => month.idMonth === monthMoviments.value
  );
  currentMonth.items.push(newMoviment);
  togglePopup();
  await save();

  if (saveAndNew) {
    togglePopup();
  }
};
const removeItem = async  (idItem) => {
  const question = await showConfirm("Are you sure ?", 'This action is irreversible');
  if (question.isConfirmed) {
    await $store.dispatch("planning/removeItem", {
      idItem,
      year
    });
    await $store.dispatch("planning/changePlanningYear", year);
    toastSuccess("Item removed successfully")
  }
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

  debugger

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

const makeToUpAdd = (array, onMonth = true) => {
  return array.reduce(
    (acc, current, index) => {
      console.log(current.id)
      const isOnDb = !isNaN(+current.id);
      let copy = { ...current };
      if (copy.typesSpent) {
        delete [copy.typesSpent];
      }
      if (onMonth) {
        debugger
        Object.assign(copy, {
          totalIn: inExpent(copy),
          totalOut: out(copy),
          spentOnDebit: spentOnDebitMonth(copy),
          spentOnCredit: spentOnCreditMonth(copy),
          items: makeToUpAdd(copy.items, false),
        });
      }
      const key = isOnDb ? "toUpdate" : "toAdd";
      console.log(key)
      acc[key].push(copy);
      return acc;
    },
    { toAdd: [], toUpdate: [] }
  );
};

const createEditItem = () => {
  togglePopup(!popupMoviments.value);
};

</script>
<style scoped lang="scss">
.item-3 {
  grid-column: span-2;
}
</style>
