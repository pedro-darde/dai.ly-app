<template>
  <RawPopup v-if="visible" @disband="disband">
    <div class="mb-5 p-2" v-for="month in monthsGroupped">
      <div class="d-flex flex-col">
        <h3 class="text-bold text-2xl p-5 font-mono">
          {{ month.monthName }} Stats
        </h3>
        <div class="flex flex-row items-center MonthDetails">
          <div class="bg-white p-5 rounded border-l-8">
            <div class="flex flex-col">
              <h3 class="text-xl font-bold">Balance</h3>
              <p
                :class="[
                  'text-xl font-bold',
                  month.balance >= 0 ? 'text-green-300' : 'text-red-400',
                ]"
              >
                {{ month.balance | toMonetary }}
              </p>
            </div>
          </div>
          <div class="bg-white p-5 rounded border-l-8">
            <h3 class="text-xl font-bold">In</h3>
            <p class="text-xl font-bold text-green-300">
              {{ month.In | toMonetary }}
            </p>
          </div>
          <div class="bg-white p-5 rounded border-l-8">
            <h3 class="text-xl font-bold">Out</h3>
            <p class="text-xl font-bold text-red-400">
              {{ month.Out | toMonetary }}
            </p>
          </div>
          <div class="bg-white p-5 rounded border-l-8">
            <h3 class="text-xl font-bold">Spent On Credit</h3>
            <p class="text-xl font-bold text-red-400">
              {{ month.spentOnCredit | toMonetary }}
            </p>
          </div>
          <div class="bg-white p-5 rounded border-l-8">
            <h3 class="text-xl font-bold">Spent On Debit</h3>
            <p class="text-xl font-bold text-red-400">
              {{ month.spentOnDebit | toMonetary }}
            </p>
          </div>
          <div class="bg-white p-5 rounded border-l-8">
            <h3 class="text-xl font-bold">Expected - Balance</h3>
            <p
              :class="[
                'text-xl font-bold',
                month.balance - month.expectedAmount >= 0
                  ? 'text-green-300'
                  : 'text-red-400',
              ]"
            >
              {{ (month.balance - month.expectedAmount) | toMonetary }}
            </p>
          </div>
        </div>

          <Details
            v-if="month.typesSpent && month.typesSpent.length"
            :details="month.typesSpent"
          />
      </div>
    </div>
  </RawPopup>
</template>

<script src="./script.js"></script>


<style scoped lang="scss">
  .MonthDetails {
    text-align: center !important;
  }
  </style>
