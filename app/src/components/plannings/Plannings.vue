<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <HeaderComponent :headerTitle="'Anual Planning'">
      <template v-slot:header>
        <div class="flex flex-row justify-end">
          <button @click="createEditItemType"
            class="flex items-center rounded bg-blue-700 text-white h-8 p-2 text-center self-end ml-2"
            title="Add Item Type">
            Add Item Type
          </button>

          <button @click="createInstallments"
            class="flex items-center rounded bg-blue-700 text-white h-8 p-2 text-center self-end ml-2"
            title="Add Installments">
            Add Installments / Recurring purchases
          </button>
        </div>
      </template>
    </HeaderComponent>
    <main>
      <div class="flex mx-48">
        <div class="flex-1"></div>
        <div class="flex-auto">
          <Select v-model="year" label="Year" :options="years" :useItemAsValue="true" id="year">
            <template v-slot:label>
              <label for="year" class="block mb-1 text-md font-bold text-gray-90 text-center mt-2">Year</label>
            </template>
          </Select>
        </div>
        <div class="flex-1 w-32 flex flex-row justify-end">
          <button @click="createCC"
            class="flex items-center rounded bg-blue-700 text-white h-8 p-2 text-center self-end ml-2"
            title="Add Credit Card">
            <CC />
          </button>
        </div>
      </div>

      <div class="flex flex-row justify-center m-2.5">

        <Planning v-if="!loading" :year="year" />
      </div>
      <CreateEditItemType v-if="popupItemTypeVisible" @isVisible="handleItemType()" />
      <BankCard v-if="popupBankCardVisible" @isVisible="handleCC()" @save="saveCC" />
      <!-- <BankCard
        v-model="popupBankCardVisible"
        @isVisible="handleCC()"
        @save="saveCC"
      />

      <CreateInstallments
        v-if="year"
        v-model="popupInstallmentsVisible"
        @isVisible="handleInstallments()"
        :planningYear="year"
      /> -->
    </main>
  </div>
</template>

<script setup>
import HeaderComponent from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Select from "../select/Select.vue";
import Planning from "../planning/Planning.vue";
import { range } from "lodash";
import { usePopup } from "@/mixins/Popup";
import BankCard from "../bank-card/card.vue";
import CC from "../icons/cc.vue";
import CreateEditItemType from "../item-type/create_edit/CreateEdit.vue";
import CreateInstallments from "../installments/CreateInstallments.vue";
import { ccService } from "@/services/CCService";
import { Toast } from "@/lib/sweetalert";
import { mapGetters, useStore } from "vuex";
import { onMounted, ref, toRefs, watch } from "vue";
import MonthsDetails from "@/components/month-details/MonthsDetails.vue";
const $store = useStore()

const { togglePopup: toggleBankCard, toggled: popupBankCardVisible } = usePopup("bankCard");
const { togglePopup: toggleItemType, toggled: popupItemTypeVisible } = usePopup("itemType");
const { togglePopup: toggleInstallments, toggled: popupInstallmentsVisible } = usePopup("installments");

const year = ref(new Date().getFullYear());
const years = range(year.value - 10, year.value + 20);
const loading = ref(false);

const createCC = () => {
  toggleBankCard(!popupBankCardVisible.value);
};

const handleCC = (value) => {
  createCC(value);
};

const createEditItemType = () => {
  toggleItemType(!popupItemTypeVisible.value);
};

const createInstallments = () => {
  toggleInstallments(!popupInstallmentsVisible.value);
};

const handleInstallments = (value) => {
  createInstallments(value);
};

const handleItemType = (value) => {
  createEditItemType(value);
};

const saveCC = async (payload) => {
  let close = true;
  let message = "Card created successfully";
  let icon = "success";
  try {
    await ccService.save(payload);
  } catch (e) {
    close = false;
    icon = "error";
    message = e.response?.data?.message ?? "Internal Server Error";
  } finally {
    Toast.fire({
      icon,
      text: message,
    });
    if (close) {
      await $store.dispatch("planning/getCards");
      handleCC(close);
    }
  }
};

watch(year, (value) => {
  $store.dispatch("planning/changePlanningYear", value);
});

onMounted(async () => {
  loading.value = true;
  await $store.dispatch('planning/changePlanningYear', year.value);
  loading.value = false;
});

const { planning } = toRefs(mapGetters({
  planning: "planning/planningGetter",
}));
</script>