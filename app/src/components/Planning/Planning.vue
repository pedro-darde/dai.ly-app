<template>
  <div
    class="bg-gray-100 container w-full p-5 rounded border-l-8 flex flex-col items-start"
  >
  <form class="m-2 w-full max-h-[650px] overflow-auto" @submit.prevent="save">
    <div class="flex flex-row items-center mb-2 text-center justify-between w-full">
      <div class="flex flex-row items-center">
        <a class="text-green-700 mr-1 text">
        <money />
      </a>
      <h2 class="text-3xl font-bold">Create planning of {{ year }}</h2>
      </div>
      <button
      type="submit"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
      >
        Save
      </button>
    </div>
    <div class="bg-neutral-300 rounded border-l-8 border-white  p-3 mb-5 text-left">
      <PlanningPreview :planning="planning" />
    </div>
      <div class="grid md:grid-cols-4 md:gap-3 mb-2">
        <Input label="Planning Title" type="text" v-model="planning.title" :required="true"/>
        <MoneyInput label="Expected Amount" v-model="planning.expectedAmount" :required="true"/>
        <Input label="Start At" type="date" v-model="planning.planningStart" :required="true"/>
        <Input label="End At" type="date" v-model="planning.planningEnd" />
      </div>
      <div class="flex flex-row items-center ml-4 mb-2">
        <a class="text-black-700 mr-1">
          <calendar />
        </a>
        <h3 class="text-2xl font-bold">Months</h3>
      </div>
      <div
        class="flex flex-col bg-gray-300 rounded border-l-8 border-gray-500  p-5 mb-5 max-h-96 overflow-auto"
        v-for="(month, key) in planning.planningMonths"
        :key="key"
      >
        <div class="grid md:grid-cols-3 md:gap-3 mb-2 items-end ml-4 ">
          <Select
            label="Month"
            type="text"
            v-model="month.idMonth"
            optionValue="id"
            optionText="monthName"
            :options="getMonthOptions(month)"
            :required="true"
          />
          <MoneyInput label="Expected Amount" v-model="month.expectedAmount" :required="true"/>
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
              v-if="canRemove()"
              type="button"
              @click="removeMonth(month.id)"
              title="Remove Mês"
              class="text-lg text-red-500"
            >
              <remove />
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center ml-8">
          <a class="text-black-700 mr-1">
            <char />
          </a>
          <h3 class="text-lg font-bold">Moviments</h3>
        </div>
        <div
          class="flex flex-col bg-gray-700 rounded border-l-8 border-white  p-5 mb-5 text-white  ml-8"
          v-for="(item, key) in month.items"
          :key="key"
        >
          <div
            :class="[
              'grid  md:gap-3 mb-2 items-end',
              item.operation == 'out' ? 'md:grid-cols-6' : 'md:grid-cols-5',
            ]"
          >
            <MoneyInput label="Value" v-model="item.value" :required="true"/>
            <Input label="Description" type="text" v-model="item.description"  :required="true"/>
            <Select
              label="Operation"
              type="text"
              v-model="item.operation"
              optionValue="value"
              optionText="name"
              :options="operations"
              :required="true"
            />
            <Input label="Date" type="date" v-model="item.date"  :required="true"/>
            <Select
              v-model="item.paymentMethod"
              label="Payment Method"
              optionText="name"
              optionValue="value"
              :options="paymentMethods"
              v-if="item.operation == 'out'"
              :required="item.operation == 'out'"
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
                v-if="canRemove()"
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
