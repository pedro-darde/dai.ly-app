<template>
  <RawPopup @disband="disband" v-if="visible">
    <div class="container p-5">
      <div class="flex flex-col items-center">
        <div>
          <h1 class="text-xl font-bold">Budget types</h1>
          <div
            class="grid md:grid-cols-3 md:gap-3 items-end"
            v-for="budget in budgets"
          >
            <Treeselect
              :disabled="budget.isOnDB"
              label="Type"
              v-model="budget.type"
              :options="itemTypes"
              :append-to-body="true"
            />
            <MoneyInput v-model="budget.amount" label="Amount" />
            <div class="flex flex-row gap-2 items-center">
              <button
                type="button"
                @click="addBudget"
                title="Add budget"
                class="text-lg"
                v-if="isLastBudget(budget.id)"
              >
                <plus />
              </button>
              <button
                type="button"
                @click="removeBudget(budget.id)"
                title="Remove budget"
                class="text-lg text-red-500"
              >
                <remove />
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-end items-end mt-5 w-full">
          <button
            @click="save"
            class="p-3 bg-green-500 rounded-md text-white font-bold hover:bg-green-300"
            type="button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </RawPopup>
</template>
<script src="./script.js"></script>
