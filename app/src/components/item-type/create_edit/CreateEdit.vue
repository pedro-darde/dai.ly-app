<template>
  <RawPopup v-if="visible" @disband="customDisband" width="650px">
    <div class="p-5">
      <div class="flex flex-col">
        <form @submit.prevent="save">
          <div class="flex flex-row justify-start mt-5">
            <p class="font-bold text-2xl">Create new Type</p>
          </div>
          <div class="flex flex-col border-8 p-3">
            <div class="flex flex-row gap-5 justify-around items-center w-full">
              <Input
                  label="Description"
                  type="text"
                  v-model="description"
                  :required="true"
              />

              <Treeselect
                  placeholder="Parent"
                  v-model="parent"
                  :options="itemTypes"
                  label="Parent"
                  :append-to-body="true"
              />
              <Input label="Active" type="checkbox" v-model="active"/>
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

        <!-- <div class="flex flex-row justify-start mt-5 w-full">
          <p class="font-bold text-2xl">Tree of Types</p>
        </div> -->
        <!-- <div class="flex flex-row justify-center">
          <nested-draggable :items="itemTypes"></nested-draggable>
        </div> -->
      </div>
    </div>
  </RawPopup>
</template>

<script setup>
import RawPopup from "../../popup/RawPopup.vue";
import {popupVisibility} from "@/mixins/Popup";
import Input from "../../input/Input.vue";
import Treeselect from "../../treeselect/Treeselect.vue";
import {itemTypeService} from "@/services/ItemTypeService";
import {defineEmits, ref, computed} from "vue";
import {useStore} from "vuex";
import {useSwal} from "@/mixins/SwalMixin";

const emit = defineEmits(["isVisible"]);
const {visible, disband} = popupVisibility(emit);
const description = ref("")
const active = ref(false)
const parent = ref(null)
const itemsTypesEdit = ref([])
const { toastSuccess } = useSwal()
const $store = useStore()
const itemTypes = computed({
  get: () => {
    return $store.getters["planning/itemTypesGetter"];
  },
  set(value) {
    console.log(value);
  },
})

async function save() {
  await itemTypeService.save({
    description: description.value,
    active: active.value,
    parent_id: parent.value,
  });
  await toastSuccess("Item created")
}

const customDisband = () => {
  disband()
}


</script>
