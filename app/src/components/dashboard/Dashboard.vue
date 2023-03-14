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
    <div class="mt-2">
      <Spinner v-if="loading"></Spinner>
      <div v-else>
        <div class="flex flex-col charts">
          <h3 class="text-2xl p-5">Total Charts</h3>
          <div class="flex flex-row justify-center w-full">
            <Pie
              :legends="typeLegends"
              :values="spentValues"
              :title="'Spents by type'"
            ></Pie>
            <Pie
              :legends="typeLegends"
              :values="earnValues"
              :title="'Earns by type'"
            ></Pie>
            <ColumnChart
              :legends="outWithItemsLegends"
              :values="outWithItemsSeries"
              title="algo"
            >
            </ColumnChart>
          </div>
          <h3 class="text-2xl p-5">Month Charts</h3>
          <div class="flex flex-row justify-center">
            <GroupedBarChart
              :legends="reducedMonthLegends"
              :values="reducedMonthSeries"
              title="Alguma coisa"
            >
            </GroupedBarChart>
            <StackedColumn
              :legends="stackedMonthLegends"
              :values="stackedMonthSeries"
              :title="'teste'"
            ></StackedColumn>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script src="./script.js"></script>
<style lang="scss" scoed>
.charts {
  #chart {
    height: 100%;
    border-radius: 20px !important;
    margin-left: 20px;
    border-color: black;
    -webkit-box-shadow: 9px 14px 13px 3px rgba(209, 207, 209, 0.82);
    -moz-box-shadow: 9px 14px 13px 3px rgba(209, 207, 209, 0.82);
    box-shadow: 9px 14px 13px 3px rgba(209, 207, 209, 0.82);
  }
}
</style>
