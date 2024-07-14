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
          <h2 class="text-3xl font-bold">Planning of {{ year }}</h2>
        </div>
        <button
          type="submit"
          class="px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
        >
          Save
        </button>
      </div>
      <div class="max-h-[650px] overflow-auto">
        <div class="flex flex-row gap-3 w-100 mb-2 justify-center items-end">
          <Input
            class="grow"
            label="Planning Title"
            type="text"
            v-model="planning.title"
            :required="true"
          />
          <MoneyInput
            class="grow"
            label="Expected Amount"
            v-model="planning.expectedAmount"
            :required="true"
            :model-value="planning.expectedAmount"
          />
          <Input
            class="grow"
            label="Start At"
            type="date"
            v-model="planning.startAt"
            :required="true"
          />
          <Input
            class="grow"
            label="End At"
            type="date"
            v-model="planning.endAt"
            :required="false"
          />
        </div>
        <div
          class="bg-neutral-300 rounded border-l-8 border-white p-3 mb-5 text-left"
        >
          <PlanningPreview :planning="planning" />
        </div>
        <div v-if="!!planning.id">
          <div class="flex flex-row items-center ml-4 mb-2 gap-2">
            <a class="text-black-700 mr-1">
              <calendar />
            </a>
            <h3 class="text-2xl font-bold">Moviments</h3>
          </div>
          <div class="grid md:grid-cols-4 md:gap-3 items-end">
            <Select
              label="Month"
              type="text"
              optionValue="id"
              optionText="monthName"
              :options="months"
              class="col-span-2"
              v-model="monthMoviments"
              :required="true"
            />

            <TreeSelect
              placeholder="Type"
              v-model:model-value="idTypeMoviments"
              :options="itemTypes"
              label="Parent"
              append-to="body"
              :display="'chip'"
            />

            <div class="flex flex-col gap-2">
              <button
                type="button"
                @click="openBudgets"
                class="px-3 py-2 text-center text-white font-bold text-xl bg-blue-400 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 h-[50%]"
              >
                Month budgets
              </button>
              <button
                @click="createEditItem"
                type="button"
                v-if="!!planning.id"
                class="grow px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 flex items-center justify-center"
              >
                Create Moviment &nbsp;
                <plus />
              </button>
            </div>

            <PlanningMonthGoals
              :idMonth="monthMoviments"
              :idPlanningMonth="planningMonth"
              :currentBudgets="currentMonthBudgets"
              v-if="popupBudgets"
              @isVisible="toggleBudgets"
            />
          </div>
          <TableMoviments
            :monthItems="monthItems"
            @editMoviment="editMoviment"
            @removeItem="removeItem"
          />
        </div>
      </div>
      <CreateEditMoviment
        :planning="planning"
        v-if="popupMoviments"
        @isVisible="togglePopup"
        @saveMonth="saveItem"
        :defaultItem="currentMovimentEdit"
        ref="createEditMovimentComponent"
      />
    </form>
  </div>
</template>

<script setup>
import money from "../icons/money.vue";
import calendar from "../icons/calendar.vue";
import Input from "../input/Input.vue";
import MoneyInput from "../money-input/MoneyInput.vue";
import plus from "../icons/plus.vue";
import Select from "../select/Select.vue";
import PlanningMonthGoals from "../planning/Goals/PlanningMonthGoals.vue";
import { usePlanningCalculator } from "@/mixins/PlanningCalculator";
import { ref, computed, onUnmounted, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useSwal } from "@/mixins/SwalMixin";
import PlanningPreview from "@/components/planning-preview/PlanningPreview.vue";
import { usePopup } from "@/mixins/Popup";
import CreateEditMoviment from "@/components/planning/Moviments/CreateEditMoviment.vue";
import TableMoviments from "./Moviments/TableMoviments.vue";
import { usePlanning } from "@/mixins/planning";
import TreeSelect from "primevue/treeselect";

const { onEdit, planning, months } = usePlanning();
const { year } = defineProps({
  year: {
    required: true,
    type: Number,
  },
});

const $store = useStore();
const monthMoviments = ref(new Date().getMonth() + 1);
const idTypeMoviments = ref(null);

const planningMonth = computed(() => {
  return planning.value.planningMonths.find(
    (month) => month.idMonth === monthMoviments.value
  )?.id;
});

const monthsToRemove = ref([]);
const itemsToRemove = ref([]);
const currentMovimentEdit = ref(null);

const itemTypes = computed(() => {
  return $store.getters["planning/itemTypesGetter"];
});

const { togglePopup, toggled: popupMoviments } = usePopup("addMoviment");
const { togglePopup: toggleBudgets, toggled: popupBudgets } =
  usePopup("budgets");

const { showConfirm, toastSuccess } = useSwal();

const openBudgets = () => {
  const currentMonth = planning.value.planningMonths.find(
    (month) => month.idMonth === monthMoviments.value
  );

  const budgets = currentMonth?.budgets.map((budget) => {
    return {
      ...budget,
      type: {
        [budget.type]: true,
      },
    };
  });

  currentMonthBudgets.value = budgets ?? [];
  toggleBudgets();
};

const editMoviment = (item) => {
  currentMovimentEdit.value = {
    ...item,
    idType: {
      [item.idType]: true,
    },
  };
  togglePopup();
};

const createEditMovimentComponent = ref(null);

const itemTypesPlain = computed({
  get: () => {
    return $store.getters["planning/plainItemTypesGetter"];
  },
});

const itemTypesAsObject = computed(() => {
  return itemTypesPlain.value.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
});

/**
 *
 * @param { { id: number, children: Array<{ id: number }> } } item
 */
const getNestedChildrenIds = (item) => {
  return (
    item.children?.reduce((acc, child) => {
      acc.push(child.id);
      acc.push(...getNestedChildrenIds(child));
      return acc;
    }, []) ?? []
  );
};

const monthItems = computed(() => {
  return planning.value.planningMonths
    .filter((month) => month.idMonth === monthMoviments.value)
    .map((month) => month.items)
    .flat()
    .filter((item) => {
      const type = Object.keys(idTypeMoviments.value ?? {});
      if (!type.length) {
        return true;
      }

      // the item type could be a child of another type, so we should find the parent

      const isParentType =
        itemTypesAsObject.value[+type[0]]?.children?.length > 0;
      if (isParentType) {
        const children = getNestedChildrenIds(
          itemTypesAsObject.value[+type[0]]
        );

        console.log({
          children,
        });

        return children.includes(item.idType) || +type[0] === item.idType;
      }
      return +type[0] === item.idType;
    });
});

onMounted(() => {
  $store.dispatch("planning/changePlanningYear", year);
});

onUnmounted(() => {
  $store.dispatch("planning/applyDefaultPlanning");
});

watch(planning, (value) => {
  planning.value = value;
});

const currentMonthBudgets = ref([]);

const saveItem = async ({ month, saveAndNew }) => {
  console.log(saveAndNew, "saveAndNew");

  const movimentToSave = {
    ...month,
    idType: Object.keys(month.idType ?? {})[0],
  };

  if (isIdFromDB(movimentToSave)) {
    await updateMoviment(movimentToSave);
  } else {
    await createMoviment(movimentToSave);
  }

  if (saveAndNew) {
    createEditMovimentComponent.value.resetState();
  } else {
    togglePopup();
  }
};

async function updateMoviment(moviment) {
  await $store.dispatch("planning/updateMoviment", {
    item: moviment,
    year,
  });
  await $store.dispatch("planning/changePlanningYear", year);
}

async function createMoviment(moviment) {
  await $store.dispatch("planning/createMoviment", {
    item: moviment,
    planning: planning.value.id,
    year,
  });
  $store.dispatch("planning/changePlanningYear", year);
}

const removeItem = async (idItem) => {
  const question = await showConfirm(
    "Are you sure ?",
    "This action is irreversible"
  );
  if (question.isConfirmed) {
    await $store.dispatch("planning/removeItem", {
      idItem,
      year,
    });
    await $store.dispatch("planning/changePlanningYear", year);
    toastSuccess("Item removed successfully");
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
  };

  if (onEdit.value) {
    action = "editPlanning";
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

const createEditItem = () => {
  currentMovimentEdit.value = null;
  togglePopup(!popupMoviments.value);
};
</script>
<style scoped lang="scss"></style>
