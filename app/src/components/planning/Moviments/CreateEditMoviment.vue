<script setup>
import Select from "@/components/select/Select.vue";
import MoneyInput from "../../money-input/MoneyInput.vue";
import { computed, ref } from "vue";
import Input from "@/components/input/Input.vue";
import { useStore } from "vuex";
import RawPopup from "@/components/popup/RawPopup.vue";
import { popupVisibility } from "@/mixins/Popup";
import DividerComponent from "@/components/divider/DividerComponent.vue";
import quickid from "@/helpers/quickid";
import TreeSelect from "primevue/treeselect";
import FloatLabel from "primevue/floatlabel";
import Checkbox from "primevue/checkbox";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { reactive } from "vue";
import { useSwal } from "@/mixins/SwalMixin";
const props = defineProps({
  planning: {
    type: Object,
    required: true,
  },
  defaultItem: {
    type: Object,
    required: false,
  },
});

const $store = useStore();

const { errors, handleSubmit, defineField, values, validate } = useForm({
  validationSchema: yup.object({
    id: yup.string().default(quickid()),
    value: yup.number().moreThan(0.0).required(),
    operation: yup.string().required(),
    date: yup.date().required(),
    paymentMethod: yup.string().required(),
    description: yup.string().required(),
    idType: yup.object().required("Type is a required field"),
    idCard: yup.number().nullable(),
    isInvestiment: yup.boolean().default(false),
  }),
  initialValues: props.defaultItem ?? {
    id: quickid(),
    value: null,
    operation: "out",
    date: null,
    paymentMethod: "debit",
    description: "",
    idType: null,
    idCard: null,
    isInvestiment: false,
  },
});

const [id] = defineField("id");
const [value] = defineField("value");
const [date] = defineField("date");
const [paymentMethod] = defineField("paymentMethod");
const [description] = defineField("description");
const [idType] = defineField("idType");
const [idCard] = defineField("idCard");
const [operation] = defineField("operation");
const [isInvestiment] = defineField("isInvestiment");
const { toastError } = useSwal();
const item = reactive({
  value,
  date,
  paymentMethod,
  description,
  idType,
  idCard,
  operation,
  isInvestiment,
  id,
});

const resetState = () => {
  item.value = {
    id: quickid(),
    value: null,
    operation: "out",
    date: null,
    paymentMethod: "debit",
    description: "",
    idType: null,
    idCard: null,
    isInvestiment: false,
  };
};

const emit = defineEmits(["saveMonth"]);
defineExpose({
  resetState,
});

const itemTypes = computed(() => {
  return $store.getters["planning/itemTypesGetter"];
});

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

const emitAddMonth = async (saveAndNew = false) => {
  const { valid, errors } = await validate();
  if (valid) {
    console.log({
      item: item,
    });
    emit("saveMonth", { month: item, saveAndNew });
  } else {
    toastError("Please, correct the errors before continue.");
  }
};

const cards = computed(() => {
  return $store.getters["planning/cardsGetter"];
});

const paymentMethods = [
  { name: "Debit", value: "debit" },
  { name: "Credit", value: "credit" },
];

const { visible, disband } = popupVisibility();

const checkTreeValue = (t) => {
  if (!Object.keys(t ?? {}).length) {
    item.idType = null;
  }
};
</script>

<template>
  <RawPopup @disband="disband" v-if="visible">
    <div class="p-5">
      <h4 class="text-2xl font-bold text-start">Create a new moviment</h4>
      <DividerComponent />
      <form>
        <div
          class="grid md:grid-cols-4 md:gap-3 mb-2 items-end ml-4 mt-4 justify-center"
        >
          <MoneyInput
            label="Value"
            v-model="item.value"
            :required="true"
            :model-value="item.value"
            :errorMessage="errors.value"
          />
          <Input
            label="Description"
            type="text"
            v-model="item.description"
            :required="true"
            :errorMessage="errors.description"
            class="md:col-span-2"
          />
          <div class="flex flex-col">
            <label class="font-bold text-start mb-2">
              Type
              <span v-if="errors.idType" class="italic text-sm text-red-500">
                {{ errors.idType }}
              </span>
            </label>

            <TreeSelect
              @change="checkTreeValue"
              v-model:model-value="item.idType"
              :options="itemTypes"
              placeholder="Select Item"
              class="md:w-20rem w-full"
              selectionMode="single"
              :class="[
                'w-full h-14 items-center',
                { 'border-red-500': errors.idType },
              ]"
            />
          </div>

          <Select
            label="Operation"
            type="text"
            v-model="item.operation"
            optionValue="value"
            optionText="name"
            :options="operations"
            :required="true"
            :errorMessage="errors.operation"
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
            :error-message="errors.date"
          />
          <div class="flex flex-row items-center">
            <Checkbox
              v-model:model-value="item.isInvestiment"
              inputId="ingredient1"
              name="pizza"
              :binary="true"
              value="Cheese"
            />
            <label for="ingredient1" class="ml-2"> Invesiment </label>
          </div>
        </div>
        <div class="flex flex-row gap-2 justify-end">
          <button
            type="button"
            @click="emitAddMonth(false)"
            class="px-3 py-2 text-sm text-center bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-black"
          >
            Save
          </button>
          <button
            type="button"
            @click="emitAddMonth(true)"
            class="px-3 py-2 text-sm text-center bg-blue-400 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-black"
          >
            Save and new
          </button>
        </div>
      </form>
    </div>
  </RawPopup>
</template>

<style scoped></style>
