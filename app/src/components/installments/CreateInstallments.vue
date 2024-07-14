<template>
  <RawPopup v-if="visible" @disband="disband()" width="800px">
    <div class="p-5 flex flex-col">
      <form @submit="onSubmit">
        <div class="grid md:grid-cols-3 md:gap-3 items-end">
          <Input
            label="Name"
            v-model="description"
            type="text"
            required
            :errorMessage="errors.description"
          />
          <TreeSelect
            v-model:model-value="type"
            label="Type"
            placeholder="Type"
            :options="itemTypes"
            :append-to-body="true"
          />
          <Select
            v-model="numberOfInstallments"
            label="N of installments"
            :options="installmentOptions"
            :useItemAsValue="true"
            id="installments"
          />
        </div>
        <div class="grid md:grid-cols-5 md:gap-3 items-end mt-2">
          <MoneyInput v-model="valueInstallment" label="Value" />
          <Input label="Start" v-model="startDate" type="date" required />
          <Select
            v-model="paymentMethod"
            label="Payment Method"
            optionText="name"
            optionValue="value"
            :options="paymentMethods"
          />
          <Select
            v-model="card"
            label="Card"
            optionText="cardName"
            optionValue="id"
            :options="cards"
            :required="false"
          />
          <div>
            <label class="inline-flex relative items-end cursor-pointer">
              <input
                type="checkbox"
                v-model="isRecurrent"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"
              ></div>
              <span class="ml-3 text-sm font-bold text-black"
                >Is Recurrent</span
              >
            </label>
          </div>
        </div>
        <div class="flex flex-row justify-end mt-5">
          <button
            type="submit"
            @click="generateInstallments()"
            class="bg-green-500 p-2 rounded-lg hover:bg-green-200 h-12"
          >
            Generate Installments
          </button>
        </div>
      </form>

      <div class="p-5 max-h-96 overflow-auto mt-5">
        <div
          class="grid md:grid-cols-2 md:gap-3"
          v-for="installment of installments"
        >
          <Input
            label="Description"
            v-model="installment.description"
            type="text"
            required
          />
          <MoneyInput
            v-model="installment.value"
            label="Value"
            :value="installment.value"
          />
        </div>
      </div>
      <div class="mt-2 flex flex-row justify-end">
        <button
          class="bg-green-500 p-2 rounded-lg hover:bg-green-200"
          @click="save()"
        >
          Save
        </button>
      </div>
    </div>
  </RawPopup>
</template>

<script setup>
import { add } from "date-fns";
import { range } from "lodash";
import { ref, watch } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import RawPopup from "../popup/RawPopup.vue";
import Input from "../input/Input.vue";
import TreeSelect from "primevue/treeselect";
import Select from "../select/Select.vue";
import MoneyInput from "../money-input/MoneyInput.vue";
import { popupVisibility } from "@/mixins/Popup";
import { useForm, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const $store = useStore();

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    description: yup.string().required(),
    valueInstallment: yup.number().required(),
    startDate: yup.date().required(),
    type: yup.object().required(),
  }),
});

const { visible, disband } = popupVisibility();

const paymentMethods = ref([
  { name: "Debit", value: "debit" },
  { name: "Credit", value: "credit" },
]);

const isRecurrent = ref(false);
const card = ref(null);
const paymentMethod = ref("debit");
const installments = ref([]);
const numberOfInstallments = ref(null);
const type = ref(null);
const [description, descriptionAttrs] = defineField("description");
const installmentOptions = range(2, 24);
const valueInstallment = ref(0);
const startDate = ref(null);

const planning = computed(() => {
  return $store.state.planning.planning;
});

const itemTypes = computed(() => {
  return $store.state.planning.itemTypes;
});

const existingYears = computed(() => {
  return $store.state.planning.existingYears;
});

const cards = computed(() => {
  return $store.state.planning.cards;
});

const months = computed(() => {
  return $store.state.planning.months;
});

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});

function getItemDescription(installmentNumber, month) {
  if (isRecurrent.value)
    return description.value
      .concat(" - ")
      .concat(
        months.value.find((item) => item.monthAsNumber === month)?.monthName
      );
  return `Installment ${installmentNumber} of ${this.description}`;
}

function generateInstallmentsMonths(installmentValue) {
  return Array.from({ length: numberOfInstallments.value }, (_, idx) => {
    const startDateAsDateObj = new Date(startDate.value);
    const date = add(startDateAsDateObj, {
      months: idx,
    });

    const planningMonth = planning.value.planningMonths.find(
      (item) => item.month === date.getMonth() + 1
    )?.id;

    return {
      description: getItemDescription(idx + 1, date.getMonth() + 1),
      value: +installmentValue,
      date,
      month: date.getMonth() + 1,
      idType: Object.keys(type.value)[0],
      paymentMethod: paymentMethod.value,
      operation: "out",
      year: date.getFullYear(),
      hasMonth: "",
      planning,
      idPlanningMonth: planningMonth,
      idCard: card.value,
    };
  });
}

function generateInstallments() {
  if (description.value) {
    alert("Description is required");
    return;
  }

  if (!valueInstallment.value) {
    alert("Value is required");
    return;
  }

  if (!startDate.value) {
    alert("Start date is required");
    return;
  }

  if (!type.value) {
    alert("Type is required");
    return;
  }

  if (valueInstallment.value !== 0 && numberOfInstallments.value) {
    const installmentValue = isRecurrent.value
      ? valueInstallment.value
      : (valueInstallment.value / numberOfInstallments.value).toFixed(2);

    const installmentsArray = generateInstallmentsMonths(installmentValue);
    console.log({ installmentsArray });
    installments.value = installmentsArray;
  }
}

function save() {
  // todo
}
// watch(visible)
</script>
<style scoped lang="scss" src="./style.scss"></style>
