<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <HeaderComponent :headerTitle="'Anual Planning'">
      <template v-slot:header>
        <div class="flex flex-row justify-end">
          <button
            @click="createEditItemType"
            class="flex items-center rounded bg-blue-700 text-white h-8 p-2 text-center self-end ml-2"
            title="Add Item Type"
          >
            Add Item Type
          </button>
        </div>
      </template>
    </HeaderComponent>
    <main>
      <div class="flex mx-48">
        <div class="flex-1"></div>
        <div class="flex-auto">
          <Select
            v-model="year"
            label="Year"
            :options="years"
            :useItemAsValue="true"
            id="year"
          >
            <template v-slot:label>
              <label
                for="year"
                class="block mb-1 text-md font-bold text-gray-90 text-center mt-2"
                >Year</label
              >
            </template>
          </Select>
        </div>
        <div class="flex-1 w-32 flex flex-row justify-end">
          <button
            @click="createCC"
            class="flex items-center rounded bg-blue-700 text-white h-8 p-2 text-center self-end ml-2"
            title="Add Credit Card"
          >
            <CC />
          </button>
        </div>
      </div>

      <div class="flex flex-row justify-center m-2.5">
        <lottie-animation
          v-if="loading"
          :loop="true"
          :autoPlay="true"
          ref="anim"
          :animationData="require('@/assets/loading.json')"
        />
        <Planning v-else :year="year" />
      </div>
      <BankCard
        v-model="popupBankCardVisible"
        @isVisible="handleCC()"
        @save="saveCC"
      />
      <CreateEditItemType
        v-model="popupItemTypeVisible"
        @isVisible="handleItemType()"
      />
    </main>
  </div>
</template>

<script src="./script.js"></script>
