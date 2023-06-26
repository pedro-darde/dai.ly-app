<template>
  <RawPopup v-if="visible" @disband="disband()" width="800px">
    <div class="p-5 flex flex-col">
      <div class="grid md:grid-cols-3 md:gap-3 items-end">
        <Input label="Name" v-model="description" type="text" required />
        <Treeselect
          v-model="type"
          label="Type"
          placeholder="Type"
          :options="itemTypes"
          :append-to-body="true"
        />
        <Select
          v-model="numberOfInstallments"
          label="N of installments"
          :options="installmentOptions"
          :useItemAsValue="true"
          id="installments"
        />
      </div>
      <div class="grid md:grid-cols-5 md:gap-3 items-end mt-2">
        <MoneyInput v-model="valueInstallment" label="Value" />
        <Input label="Start" v-model="startDate" type="date" required />
        <Select
          v-model="paymentMethod"
          label="Payment Method"
          optionText="name"
          optionValue="value"
          :options="paymentMethods"
        />
        <Select
          v-model="card"
          label="Card"
          optionText="cardName"
          optionValue="id"
          :options="cards"
          :required="false"
        />
        <div>
          <label class="inline-flex relative items-end cursor-pointer">
            <input type="checkbox" v-model="isRecurrent" class="sr-only peer" />
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"
            ></div>
            <span class="ml-3 text-sm font-bold text-black">Is Recurrent</span>
          </label>
        </div>
      </div>
      <div class="flex flex-row justify-end mt-5">
        <button
          @click="generateInstallments()"
          class="bg-green-500 p-2 rounded-lg hover:bg-green-200 h-12"
        >
          Generate Installments
        </button>
      </div>
      <div class="p-5 max-h-96 overflow-auto mt-5">
        <div
          class="grid md:grid-cols-2 md:gap-3"
          v-for="installment of installments"
        >
          <Input
            label="Description"
            v-model="installment.description"
            type="text"
            required
          />
          <MoneyInput v-model="installment.value" label="Value" />
        </div>
      </div>
      <div class="mt-2 flex flex-row justify-end">
        <button
          class="bg-green-500 p-2 rounded-lg hover:bg-green-200"
          @click="save()"
        >
          Save
        </button>
      </div>
    </div>
  </RawPopup>
</template>

<script src="./script.js"></script>
<style scoped lang="scss" src="./style.scss"></style>
