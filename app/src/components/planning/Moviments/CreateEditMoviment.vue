<script setup>
import Select from "@/components/select/Select.vue";
import MoneyInput from "../../money-input/MoneyInput.vue";
import { computed, ref } from "vue";
import { toHtmlDateTimeFormat } from "@/helpers/DateFormatter";
import Input from "@/components/input/Input.vue";
import { useStore } from "vuex";
import RawPopup from "@/components/popup/RawPopup.vue";
import { popupVisibility } from "@/mixins/Popup";
import DividerComponent from "@/components/divider/DividerComponent.vue";
import quickid from "@/helpers/quickid";
import TreeSelect from 'primevue/treeselect';
import FloatLabel from 'primevue/floatlabel'
defineProps({
  planning: {
    type: Object,
    required: true
  }
})

const $store = useStore()
const item = ref({
  id: quickid(),
  value: 0,
  operation: "out",
  date: toHtmlDateTimeFormat(new Date()),
  paymentMethod: "debit",
  description: "",
  idType: null,
  idCard: null,
})


const emit = defineEmits(['addMonth'])

const itemTypes = computed(() => {
  return $store.getters["planning/itemTypesGetter"];
})

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

const emitAddMonth = (saveAndNew = false) => {
  emit('addMonth', item.value, saveAndNew)
}

const cards = computed(() => {
  return $store.getters["planning/cardsGetter"];
})

const paymentMethods = [
  { name: "Debit", value: "debit" },
  { name: "Credit", value: "credit" },
];

const { visible, disband } = popupVisibility();


</script>

<template>
  <RawPopup @disband="disband" v-if="visible">

    <div class="p-5">
      <h4 class="text-2xl font-bold text-start"> Create a new moviment </h4>
      <DividerComponent />
      <form @submit.prevent="emitAddMonth">
        <div class="grid md:grid-cols-4 md:gap-3 mb-2 items-end ml-4 mt-4 justify-center">
          <MoneyInput label="Value" v-model="item.value" :required="true" :model-value="item.value" />
          <Input label="Description" type="text" v-model="item.description" :required="true" />
          <FloatLabel class="w-full md:w-20rem">
              <TreeSelect v-model:model-value="item.idType" :options="itemTypes" placeholder="Select Item" class="md:w-20rem w-full"   selectionMode="single" :pt="true"  />
              <label>Type</label>
          </FloatLabel>
          <Select label="Operation" type="text" v-model="item.operation" optionValue="value" optionText="name"
            :options="operations" :required="true" />
          <Select v-model="item.paymentMethod" label="Payment Method" optionText="name" optionValue="value"
            :options="paymentMethods" v-if="item.operation == 'out'" :required="item.operation == 'out'" />
          <Select v-model="item.idCard" label="Card" optionText="cardName" optionValue="id" :options="cards"
            :required="false" />
          <Input label="Date" type="date" v-model="item.date" :required="true" />
        </div>
        <div class="flex flex-row gap-2 justify-end">
            <button type="submit"
              class="px-3 py-2 text-sm text-center bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-black">
              Save
            </button>
            <button type="button" @click="emitAddMonth(true)"
              class="px-3 py-2 text-sm text-center bg-blue-400 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-black">
              Save and new
            </button>
        </div>
      </form>

    </div>
  </RawPopup>

</template>

<style scoped></style>