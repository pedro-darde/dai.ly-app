<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <Header :headerTitle="'Tasks'"></Header>
    <main>
      <div class="flex">
        <div class="flex-none"></div>
        <div class="flex-auto w-64">
          <WriteTask></WriteTask>
        </div>
        <div class="flex-auto w-32">
          <div class="container mx-auto p-2">
            <div class="mt-10"></div>
            <div
              class="w-full p-4 bg-yellow-200 border rounded-lg shadow-md sm:p-8"
            >
              <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900">
                  Latest Tasks
                </h5>
                <a
                  href="/tasks/reject-and-validated"
                  class="text-sm font-medium text-blue-600 hover:underline"
                >
                  Rejected and Validated
                </a>
              </div>
              <div class="flow-root max-h-64 overflow-auto">
                <ul
                  role="list"
                  class="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li
                    class="py-3 sm:py-4 bg-yellow-100 border rounded-lg shadow-md mb-2"
                    v-for="task in tasks"
                    :key="task.id"
                  >
                    <Task :task="task"></Task>
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
