<template>
  <div
    class="bg-gray-100 container w-full p-5 rounded border-l-8 flex flex-col items-start"
  >
    <form class="m-2 w-full" @submit.prevent="save">
      <div
        class="flex flex-row items-center mb-2 text-center justify-between w-full"
      >
        <div class="flex flex-row items-center">
          <a class="text-green-700 mr-1 text">
            <money />
          </a>
          <h2 class="text-3xl font-bold">Create planning of {{ year }}</h2>
        </div>
        <button
          type="submit"
          class="px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
        >
          Save
        </button>
      </div>
      <div class="max-h-[650px] overflow-auto">
        <div
          class="bg-neutral-300 rounded border-l-8 border-white p-3 mb-5 text-left"
        >
          <PlanningPreview :planning="planning" />
        </div>
        <div class="grid md:grid-cols-4 md:gap-3 mb-2">
          <Input
            label="Planning Title"
            type="text"
            v-model="planning.title"
            :required="true"
          />
          <MoneyInput
            label="Expected Amount"
            v-model="planning.expectedAmount"
            :required="true"
          />
          <Input
            label="Start At"
            type="date"
            v-model="planning.startAt"
            :required="true"
          />
          <Input
            label="End At"
            type="date"
            v-model="planning.endAt"
            :required="false"
          />
        </div>
        <div class="grid md:grid-cols-4 md:gap-3 mb-2">
          <button
            type="button"
            class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="collapseMonths()"
          >
            Collapse all months
          </button>
        </div>
        <div class="flex flex-row items-center ml-4 mb-2">
          <a class="text-black-700 mr-1">
            <calendar />
          </a>
          <h3 class="text-2xl font-bold">Months</h3>
        </div>
        <div
          class="flex flex-col bg-gray-300 rounded border-l-8 border-gray-500 p-5 mb-5"
          v-for="(month, key) in planning.planningMonths"
          :key="key"
        >
          <div class="grid md:grid-cols-4 md:gap-3 mb-2 items-end ml-4">
            <Select
              label="Month"
              type="text"
              v-model="month.idMonth"
              optionValue="id"
              optionText="monthName"
              :options="getMonthOptions(month)"
              :required="true"
            />
            <MoneyInput label="Credit status" v-model="month.creditStatus" />

            <div class="flex flex-row gap-2 items-center">
              <a
                class="text-blue-400 ml-2 font-mono hover:font-bold"
                href="#"
                @click="month.toggledGoals = !month.toggledGoals"
              >
                Add goals
              </a>
              <button
                type="button"
                @click="addMonth(month)"
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
              <button
                type="button"
                class="text-lg"
                @click="month.hidden = !month.hidden"
              >
                <button
                  type="button"
                  class="transition ease-in duration-100"
                  :class="{ '-rotate-180': !month.hidden }"
                >
                  <ArrowDown />
                </button>
              </button>
            </div>
          </div>
          <PlanningMonthGoals
            :idPlanningMonth="month.id"
            :currentGoals="month.goals"
            :currentBudgets="month.budgets"
            v-model="month.toggledGoals"
            @isVisible="handlePopup(month)"
          />
          <div class="flex flex-col items-start ml-8" v-if="!month.hidden">
            <div class="mb-2 border rounded-sm p-2">
              <div class="flex flex-row gap-2 items-center justify-center">
                <h1 class="text-xl font-bold">Filters</h1>
                <!--                <font-awesome-icon icon="fa-solid fa-filter" />-->
              </div>

              <div class="grid md:gap-3 md:grid-cols-3">
                <Input
                  label="Description"
                  placeholder="Enter item description here"
                  v-model="month.searchTerm"
                  :required="false"
                  v-if="!month.hidden"
                  @input="onInputSearch($event, month)"
                />
                <Treeselect
                  placeholder="Type"
                  v-model="month.searchType"
                  :options="itemTypes"
                  v-if="!month.hidden"
                  label="Type"
                  :required="false"
                  @input="onInputSearch($event, month, 'idType')"
                />
                <Select
                  v-model="month.searchPaymentType"
                  label="Payment Method"
                  optionText="name"
                  optionValue="value"
                  v-if="!month.hidden"
                  :required="false"
                  :options="paymentMethods"
                  @input="onInputSearch($event, month, 'paymentMethod')"
                />
              </div>
            </div>
            <div class="flex flex-row">
              <a class="text-black-700 mr-1">
                <char />
              </a>
              <h3 class="text-lg font-bold">Moviments</h3>
            </div>
          </div>

          <TransitionGroup mode="out-in" class="max-h-96 overflow-auto">
            <div
              class="flex flex-col bg-gray-700 rounded border-l-8 border-white p-5 mb-5 text-white ml-8"
              v-for="(item, key) in month.items"
              :key="key"
            >
              <div
                v-if="!item.hidden && !month.hidden"
                :class="[
                  'grid  md:gap-3 mb-2 items-end',
                  item.operation == 'out' ? 'md:grid-cols-8' : 'md:grid-cols-7',
                ]"
              >
                <MoneyInput
                  label="Value"
                  v-model="item.value"
                  :required="true"
                />
                <Input
                  label="Description"
                  type="text"
                  v-model="item.description"
                  :required="true"
                />
                <Treeselect
                  placeholder="Type"
                  v-model="item.idType"
                  :required="true"
                  :options="itemTypes"
                  label="Type"
                />
                <Select
                  label="Operation"
                  type="text"
                  v-model="item.operation"
                  optionValue="value"
                  optionText="name"
                  :options="operations"
                  :required="true"
                />
                <Select
                  v-model="item.paymentMethod"
                  label="Payment Method"
                  optionText="name"
                  optionValue="value"
                  :options="paymentMethods"
                  v-if="item.operation == 'out'"
                  :required="item.operation == 'out'"
                />
                <Select
                  v-model="item.idCard"
                  label="Card"
                  optionText="cardName"
                  optionValue="id"
                  :options="cards"
                  :required="false"
                />
                <Input
                  label="Date"
                  type="date"
                  v-model="item.date"
                  :required="true"
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
          </TransitionGroup>
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
