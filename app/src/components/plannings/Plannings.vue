<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <HeaderComponent :headerTitle="'Anual Planning'"></HeaderComponent>
    <main>
      <div class="flex mx-48">
        <div class="flex-1"></div>
        <div class="flex-auto">
          <Select v-model="year" label="Year" :options="years" :useItemAsValue="true" id="year">
            <template v-slot:label>
              <label for="year" class="block mb-1 text-md font-bold text-gray-90 text-center mt-2">Year</label>
            </template>
          </Select>
        </div>
        <div class="flex-1 w-32 flex flex-row justify-end">
          <button @click="createCC"
            class="flex items-center rounded bg-blue-700 text-white h-8 p-2 text-center self-end ml-2"
            title="Add Credit Card">
            <CC />
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-center m-2.5">
        <Planning v-if="!loading" :year="year" :currentPlanning="planning" />
      </div>
      <BankCard v-model="popupBankCardVisible" @isVisible="handleCC()" />
    </main>
  </div>
</template>

<script src="./script.js"></script>
