<template>
  <form @submit.prevent="save" id="form-items">
    <div class="p-5 max-h-[350px] overflow-auto">
      <div v-for="item in itemTypesPlain">
        <div class="flex flex-col p-3">
          <div class="flex flex-row gap-5 items-end w-full">
            <Input
              label="Description"
              type="text"
              v-model="item.description"
              :required="true"
            />
            <TreeSelect
              placeholder="Parent"
              v-model:model-value="item.parent"
              :options="itemTypes"
              label="Parent"
            />
            <div class="flex flex-col items-center">
              <label> Active </label>
              <Checkbox v-model:model-value="item.active" :binary="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-end">
      <button
        type="submit"
        class="p-2 bg-green-500 rounded hover:bg-green-200 mt-2"
      >
        Salvar
      </button>
    </div>
  </form>
</template>

<script setup>
import { useStore } from "vuex";
import Input from "@/components/input/Input.vue";
import TreeSelect from "primevue/treeselect";
import Checkbox from "primevue/checkbox";
import { computed } from "vue";
const $store = useStore();

const itemTypesPlain = computed({
  get: () => {
    return $store.getters["planning/plainItemTypesGetter"];
  },
  set(value) {
    $store.dispatch("planning/setItemTypes", value);
  },
});

const itemTypes = computed(() => {
  return $store.getters["planning/itemTypesGetter"];
});

async function save() {
  const items = itemTypesPlain.value.map((item) => ({
    ...item,
    id_parent: item.parent ? +Object.keys(item.parent)[0] : null,
  }));
  console.log(items);
  await $store.dispatch("planning/saveItemTypes", itemTypesPlain.value);
}
</script>
