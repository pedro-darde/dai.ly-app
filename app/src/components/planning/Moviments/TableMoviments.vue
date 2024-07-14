<template>
  <table
    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded mt-5"
  >
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400 sticky top-0"
    >
      <tr>
        <th scope="col" class="px-6 py-3">Value</th>
        <th scope="col" class="px-6 py-3">Description</th>
        <th scope="col" class="px-6 py-3">Type</th>
        <th scope="col" class="px-6 py-3">Operation</th>
        <th scope="col" class="px-6 py-3">Payment Method</th>
        <th scope="col" class="px-6 py-3">Card</th>
        <th scope="col" class="px-6 py-3">Date</th>
        <th colspan="2" class="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody
      class="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 dark:text-white h-96 overflow-y-auto"
    >
      <tr v-for="month in monthItems" :key="month.id">
        <td class="px-6 py-4">
          {{ $filters.toMonetary(month.value) }}
        </td>
        <td class="px-6 py-4">
          {{ month.description }}
        </td>
        <td class="px-6 py-4">
          {{ getTypeDescription(month.idType) }}
        </td>
        <td class="px-6 py-4">
          <p v-if="month.operation == 'out'" class="text-red-500 text-2xl">
            &downarrow;
          </p>
          <p v-else class="text-green-500 text-2xl">&uparrow;</p>
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
            <a @click="editMoviment(month)">
              <font-awesome-icon
                icon="pencil"
                size="xl"
                style="cursor: pointer"
              />
            </a>

            <a @click="removeItem(month.id)">
              <font-awesome-icon
                icon="trash"
                size="xl"
                color="red"
                style="cursor: pointer"
              />
            </a>
          </div>
        </td>
      </tr>
    </tbody>
    <tfoot
      class="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 dark:text-white text-bold"
    >
      <tr rowspan="2">
        <td colspan="8" class="px-6 py-4">In: {{ totalIn({}, monthItems) }}</td>
      </tr>
      <tr rowspan="2">
        <td colspan="8" class="px-6 py-4">Out: {{ out({}, monthItems) }}</td>
      </tr>
      <tr rowspan="2">
        <td colspan="8" class="px-6 py-4">In:</td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
import { useFilters } from "@/filters";
import { usePlanningCalculator } from "@/mixins/PlanningCalculator";
import { computed } from "vue";
import { defineEmits } from "vue";
import { useStore } from "vuex";

const { in: totalIn, out } = usePlanningCalculator();
const $filters = useFilters();
const $store = useStore();
const emit = defineEmits(["editMoviment", "removeItem"]);
const props = defineProps({
  monthItems: Array,
});

const itemTypes = computed(() => {
  return $store.getters["planning/itemTypesGetter"];
});

const editMoviment = (moviment) => {
  emit("editMoviment", moviment);
};

/**
 *
 * @param id {number}
 */
const removeItem = (id) => {
  emit("removeItem", id);
};

const getTypeDescription = (idType) => {
  let findedItem = itemTypes.value.find((item) => item.id === idType);

  if (!findedItem) {
    findedItem = itemTypesChildren.value.find((child) => child.id === idType);
  }

  return findedItem?.description || "Not found";
};

const itemTypesChildren = computed(() => {
  return itemTypes.value
    .filter((item) => item.children)
    .map((item) => item.children)
    .flat();
});
</script>
