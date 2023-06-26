<template>
  <div class="flex flex-row p-5 justify-center">
    <div v-for="card in cards" :key="card.id">
      <h3 class="font-bold text-xl text-start">{{ card.cardName }}</h3>
      <Preview :card="card" />
      <div class="container">
        <div class="flex flex-row justify-end bg-slate-100 mr-2 rounded" v-if="card.transactions && card.transactions.length">
          <a href="#" class="p-2 font-bold" @click="toggleTransactions(card)"> {{ !card.showTransactions ? "+": "-" }} </a>
        </div>
        <Transition name="fade">
          <div v-if="card.showTransactions" class="bg-slate-300 mr-2 rounded">
            <h2 class="text-center ml-2 p-2 font-bold text-xl"> Transactions </h2>
            <div class="flex flex-row justify-center" v-for="transaction in card.transactions" :key="`${transaction.value}_${transaction.description}`">
              <p :class='["p-2 font-bold text-center", transaction.operation == "in" ? "text-green-500": "text-red-400"]'> {{  $filters.toMonetary (transaction.value) }} </p>
              <p class="p-2"> {{ transaction.description }} </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script src="./details.js"></script>
<style lang="scss">
  .fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
