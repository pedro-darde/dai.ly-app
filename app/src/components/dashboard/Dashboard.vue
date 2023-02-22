<template>
  <main>
    <NavbarComponent></NavbarComponent>
    <HeaderComponent :headerTitle="'Dashboard'">
      <template v-slot:header>
        <div class="flex flex-col justify-center items-center">
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
          <button
            class="rounded p-2 bg-green-500 mt-2 font-bold"
            @click="searchForDashboardStats"
          >
            Search stats
          </button>
        </div>
      </template>
    </HeaderComponent>
    <div class="container">

      <p v-if="loading" class="text-center"> Loading... </p>
    </div>
  </main>
</template>

<script src="./script.js"></script>
