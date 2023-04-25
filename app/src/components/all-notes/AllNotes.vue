<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <Header :headerTitle="'All Notes'" about="All notes list"></Header>
    <main>
      <div
        class="w-50 border-b border-gray-400 flex p-5 last:border-b-0 items-center justify-center"
      >
        <ul
          role="list"
          class="flex items-center justify-between divide-y divide-gray-200 dark:divide-gray-700"
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
    </main>
  </div>
</template>

<script src="./script.js"></script>
