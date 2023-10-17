<template>
  <div class="plannings">
    <Plannings v-if="!isloading" />
  </div>
</template>

<script setup>
import Plannings from "@/components/plannings/Plannings.vue";
import { onMounted, ref } from "vue"
import { useStore } from "vuex";
const $store = useStore();

const isloading = ref(true);
onMounted(async () => { 
  await Promise.all([
      $store.dispatch("planning/getMonths"),
      $store.dispatch("planning/getItemTypes"),
      $store.dispatch("planning/getCards"),
      $store.dispatch("setting/getSettings"),
  ]);
  isloading.value = false;
})
</script>
