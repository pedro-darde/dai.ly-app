<template>
  <RawPopup v-if="visible" @disband="customDisband" width="650px">
    <div class="p-5">
      <TabView>
        <TabPanel header="Create">
          <div class="flex flex-col">
            <form @submit.prevent="save">
              <div class="flex flex-col p-3">
                <div class="flex flex-row gap-5 items-end w-full">
                  <Input
                    label="Description"
                    type="text"
                    v-model="description"
                    :required="true"
                  />

                  <Treeselect
                    placeholder="Parent"
                    v-model:model-value="parent"
                    :options="itemTypes"
                    label="Parent"
                    append-to="body"
                  />
                  <div class="flex flex-col items-center">
                    <label> Active </label>
                    <Checkbox v-model:model-value="active" :binary="true" />
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
              </div>
            </form>
          </div>
        </TabPanel>
        <TabPanel header="Current Types">
          <ListItems />
        </TabPanel>
      </TabView>
    </div>
  </RawPopup>
</template>

<script setup>
import RawPopup from "../../popup/RawPopup.vue";
import { popupVisibility } from "@/mixins/Popup";
import Input from "../../input/Input.vue";
import { itemTypeService } from "@/services/ItemTypeService";
import { defineEmits, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useSwal } from "@/mixins/SwalMixin";
import Treeselect from "primevue/treeselect";
import Checkbox from "primevue/checkbox";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import ListItems from "./ListItems.vue";

const emit = defineEmits(["isVisible"]);
const { visible, disband } = popupVisibility(emit);
const description = ref("");
const active = ref(false);
const parent = ref(null);
const itemsTypesEdit = ref([]);
const { toastSuccess } = useSwal();
const $store = useStore();
const itemTypes = computed({
  get: () => {
    return $store.getters["planning/itemTypesGetter"];
  },
  set(value) {
    console.log(value);
  },
});

watch(active, (_) => {
  console.log(active.value);
});
async function save() {
  await itemTypeService.save({
    description: description.value,
    active: active.value,
    parent_id: parent.value ? Object.keys(parent.value)[0] : null,
  });
  await toastSuccess("Item created");
}

const customDisband = () => {
  disband();
};
</script>
