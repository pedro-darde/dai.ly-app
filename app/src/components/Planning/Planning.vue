<template>
  <div
    class="bg-gray-100 container w-full p-5 rounded border-l-8 flex flex-col items-start"
  >
    <div class="flex flex-row items-center mb-2 text-center justify-center">
      <a class="text-green-700 mr-1 text">
        <money />
      </a>
      <h2 class="text-3xl font-bold">Create planning of {{ year }}</h2>
    </div>
    <div class="flex flex-row justify-between">
      <div class="bg-white p-5 rounded border-l-8">
        <div class="flex flex-col">
          <h3 class="text-xl font-bold">Balance</h3>
          <p
            :class="[
              'text-xl font-bold',
              planningBalance >= 0 ? 'text-green-300' : 'text-red-400',
            ]"
          >
            {{ planningBalance | toMonetary }}
          </p>
        </div>
      </div>
      <div class="bg-white p-5 rounded border-l-8">aqui</div>
      <div class="bg-white p-5 rounded border-l-8">aqui</div>
    </div>

    <form class="m-2">
      <div class="grid md:grid-cols-4 md:gap-3 mb-2">
        <Input label="Planning Title" type="text" v-model="planning.title" />
        <MoneyInput label="Expected Amount" v-model="planning.expectedAmount" />
        <Input label="Start At" type="date" v-model="planning.planningStart" />
        <Input label="End At" type="date" v-model="planning.planningEnd" />
      </div>
      <div class="flex flex-row items-center ml-4">
        <a class="text-black-700 mr-1">
          <calendar />
        </a>
        <h3 class="text-lg font-bold">Months</h3>
      </div>
      <div
        class="flex flex-col"
        v-for="(month, key) in planning.months"
        :key="key"
      >
        <div class="grid md:grid-cols-3 md:gap-3 mb-2 items-end ml-4">
          <Select
            label="Month"
            type="text"
            v-model="planning.idMonth"
            optionValue="id"
            optionText="monthName"
            :options="months"
          />
          <MoneyInput label="Expected Amount" v-model="month.expectedAmount" />
          <div class="flex flex-row">
            <button
              type="button"
              @click="addMonth"
              title="Adicionar Mês"
              class="text-lg"
              v-if="isLastMonth(month.id)"
            >
              <plus />
            </button>
            <button
              v-if="key != 0"
              type="button"
              @click="removeMonth(month.id)"
              title="Remove Mês"
              class="text-lg text-red-500"
            >
              <remove />
            </button>
          </div>
        </div>
        <div class="flex flex-row justify-start">
          <div class="bg-white p-5 rounded border-l-8">
            <div class="flex flex-col">
              <h3 class="text-xl font-bold">Month Balance</h3>
              <p
                :class="[
                  'text-xl font-bold',
                  monthBalance(month) >= 0 ? 'text-green-300' : 'text-red-400',
                ]"
              >
                {{ monthBalance(month) | toMonetary }}
              </p>
            </div>
          </div>
          <div class="bg-white p-5 rounded border-l-8">aqui</div>
          <div class="bg-white p-5 rounded border-l-8">aqui</div>
        </div>
        <div class="flex flex-row items-center ml-8">
          <a class="text-black-700 mr-1">
            <char />
          </a>
          <h3 class="text-lg font-bold">Moviments</h3>
        </div>
        <div
          class="flex flex-col"
          v-for="(item, key) in month.items"
          :key="key"
        >
          <div
            :class="[
              'grid  md:gap-3 mb-2 items-end ml-8',
              item.operation == 'out' ? 'md:grid-cols-5' : 'md:grid-cols-4',
            ]"
          >
            <MoneyInput label="Value" v-model="item.value" />
            <Select
              label="Operation"
              type="text"
              v-model="item.operation"
              optionValue="value"
              optionText="name"
              :options="operations"
            />
            <Input label="Date" type="date" v-model="item.date" />
            <Select
              v-model="item.paymentMethod"
              label="Payment Method"
              optionText="name"
              optionValue="value"
              :options="paymentMethods"
              v-if="item.operation == 'out'"
            />
            <div class="flex flex-row">
              <button
                v-if="isLastItem(month, item.id)"
                type="button"
                @click="addItem(month)"
                title="Adicionar Mês"
                class="text-lg"
              >
                <plus />
              </button>
              <button
                v-if="key != 0"
                type="button"
                @click="removeItem(month, item.id)"
                title="Remove Item"
                class="text-lg text-red-500"
              >
                <remove />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="scss">
.item-3 {
  grid-column: span-2;
}
</style>
