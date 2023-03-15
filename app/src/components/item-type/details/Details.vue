<template>
  <div class="container mt-2 p-2">
    <h2 class="font-bold text-center mb-2">Spents by Type</h2>

    <table class="w-full text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" class="px-3 py-3">Description</th>
          <th colspan="2" scope="col" class="px-3 py-3">Value</th>
        </tr>
      </thead>
      <tbody v-for="detail in details" class="bg-white border-b">
        <tr>
          <td class="px-3 py-3">
            {{ detail.description }}
          </td>
          <td class="px-3 py-3">{{ detail.value | toMonetary }}</td>
          <td class="px-3 py-3 text-center">
            <p
              v-if="detail.operation == 'in'"
              class="text-green-600 font-bold text-xl"
            >
              +
            </p>
            <p v-else class="text-red-700 font-bold text-xl">-</p>
          </td>
          <td>
            <a
              href="#"
              @click="detail.toggledItems = !detail.toggledItems"
              class="font-bold text-xs"
            >
              See items
            </a>
          </td>
        </tr>
        <tr
          v-if="shouldShowItems(detail)"
          v-for="item in detail.items"
          class="text-xs bg-gray-400 text-white font-bold ml-5"
        >
          <td class="px-3 py-3">{{ item.description }}</td>
          <td colspan="3" class="px-3 py-3">{{ item.value | toMonetary }}</td>
        </tr>
      </tbody>

      <tfoot
        class="text-xs text-gray-700 uppercase bg-gray-300 border-b-8 border-gray-400"
      >
        <tr>
          <td colspan="3" class="font-bold text-right px-6 py-3 text-base">
            Total In
          </td>
          <td class="text-center text-green-500 font-bold">
            + {{ totalIn | toMonetary }}
          </td>
        </tr>
        <tr>
          <td colspan="3" class="font-bold text-right px-6 py-3 text-base">
            Total Out
          </td>
          <td class="text-center text-red-500 font-bold">
            - {{ totalOut | toMonetary }}
          </td>
        </tr>
        <tr class="text-center">
          <td colspan="3" class="font-bold text-right px-6 py-3 text-base"></td>
          <td class="font-bold">= {{ balance | toMonetary }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
