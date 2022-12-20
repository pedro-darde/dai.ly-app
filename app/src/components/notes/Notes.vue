<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <HeaderComponent :headerTitle="'Notes'"></HeaderComponent>
    <main>
      <div class="flex">
        <div class="flex-none"></div>
        <div class="flex-auto w-64">
          <WriteNote></WriteNote>
        </div>
        <div class="flex-auto w-32">
          <div class="container mx-auto p-2">
            <div class="mt-10"></div>
            <div
              class="w-full p-4 bg-yellow-200 border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
            >
              <div class="flex items-center justify-between mb-4">
                <h5
                  class="text-xl font-bold leading-none text-gray-900 dark:text-white"
                >
                  Latest Notes
                </h5>
                <a
                  href="#"
                  class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  View all
                </a>
              </div>
              <div class="flow-root max-h-64 overflow-auto">
                <ul
                  role="list"
                  class="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li
                    class="py-3 sm:py-4 bg-yellow-100 border rounded-lg shadow-md mb-2"
                    v-for="note in notes"
                    :key="note.id"
                  >
                    <Note :note="note"></Note>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="./script.js"></script>

<style scoped></style>
