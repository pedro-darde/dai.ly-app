<template>
  <div class="container mt-2 p-2">
    <h2 class="font-bold text-center mb-2">Spents by Type</h2>
    <BodyDetails :items="items" :details="details" />
    <div class="flex flex-col items-end">
      <div class="flex flex-row items-center">
        <span class="font-bold text-right px-6 py-3 text-base"> Total In </span>
        <span class="text-center text-green-500 font-bold">
          + {{ totalIn | toMonetary }}
        </span>
      </div>
      <div class="flex flex-row items-center">
        <span colspan="3" class="font-bold text-right px-6 py-3 text-base">
          Total Out
        </span>
        <span class="text-center text-red-500 font-bold">
          - {{ totalOut | toMonetary }}
        </span>
      </div>
      <div class="flex flex-row items-center">
        <span class="font-bold text-right px-6 py-3 text-base"></span>
        <span class="font-bold">= {{ balance | toMonetary }}</span>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
