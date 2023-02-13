<template>
  <div class="flex flex-row p-5 justify-center">
    <div v-for="card in cards" :key="card.id">
      <h3 class="font-bold text-xl text-start">{{ card.cardName }}</h3>
      <Preview :card="card" />
    </div>
  </div>
</template>
<script src="./details.js"></script>
