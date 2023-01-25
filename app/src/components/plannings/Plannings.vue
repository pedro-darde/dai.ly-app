<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <HeaderComponent :headerTitle="'Anual Planning'"></HeaderComponent>
    <main>
      <div class="flex flex-row justify-center">
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

      <div class="flex flex-row justify-center m-2.5">
        <Planning  v-if="!loading" :year="year" :currentPlanning="planning"/>
      </div>
    </main>
  </div>
</template>

<script src="./script.js"></script>
