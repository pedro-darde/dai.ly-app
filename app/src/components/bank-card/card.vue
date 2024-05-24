<template>
  <RawPopup v-if="visible" @disband="disband">
    <ul
      class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 p-2">
      <li class="mr-2" v-for="tab in tabs" :key="tab.value">
        <a @click="handleChangeTab(tab)" href="#" aria-current="page" :class="[
          'inline-block p-4 text-blue-600 rounded-t-lg',
          activeTab == tab.value ? 'bg-gray-300 group-active' : 'bg-gray-50',
        ]">
          {{ tab.name }}
        </a>
      </li>
    </ul>
    <div class="flex-1 flex gap-8 mb:flex-col-reverse bg-gray-400 p-5" v-if="activeTab == 0">
      <form class="flex-1 max-w-[500px] flex flex-col gap-5 p-5" @submit.prevent="save">
        <Input label="Card name" v-model="card.cardName" name="cardName" />
        <Input label="Number" v-model="card.number" mask="#### #### #### ####" name="cardNumber" />
        <Input v-model="card.ownerName" label="OWNER NAME" />
        <Input v-model="card.validateDate" mask="##/##" name="expiration" label="EXPIRATION" />

        <Input v-model="card.cvv" mask="###" name="cvv" label="CVV" />
        <button
          class="bg-cyan-500 p-3 text-zinc-900 rounded disabled:bg-zinc-500 disabled:text-zinc-800 flex items-center justify-center">
          <span class="font-semibold"> Save Card </span>
        </button>
      </form>
      <!-- <CardPreview  :card="card"/> -->

    </div>
    <div v-if="activeTab == 1">
      <Details />
    </div>
  </RawPopup>
</template>
<script setup>
import { popupVisibility } from '@/mixins/Popup';
import Input from '../input/Input.vue';
// import CardPreview from './card-preview.vue';
import { ref } from 'vue';
import RawPopup from '../popup/RawPopup.vue';
import { getMatchedByCardNumber } from '@/helpers/regexMatcher';

const { visible, disband } = popupVisibility();
const card = ref(
  {
    cardName: "",
    ownerName: "",
    number: "",
    flag: "",
    validateDate: "",
    creditLimit: 0,
    type: "debit&credit",
    cvv: "",
  }
);

const emit = defineEmits(["save"]);

const tabs = ref([
  {
    name: "Create Card",
    value: 0,
  },
  {
    name: "My Cards",
    value: 1,
  },
])
const activeTab = ref(0)

function handleChangeTab({ value }) {
  activeTab.value = value;
}
function save() {
  card.value.flag = getMatchedByCardNumber(
    card.value.number?.replace(/\s/g, "")
  );
  emit("save", card.value);
}

</script>
