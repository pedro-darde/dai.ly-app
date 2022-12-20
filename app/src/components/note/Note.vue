<template>
  <div class="flex items-center space-x-4">
    <div class="flex-1 min-w-0">
      <p class="text-xl font-bold truncate dark:text-white">
        {{ note.created_at | toDateBR }}
      </p>
      <p class="text-lg text-gray-500 truncate dark:text-gray-400 italic">
        {{ note.description }}
      </p>
    </div>
    <div
      class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white p-2"
    >
      <a
        href="#"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-red-400"
      >
        <Remove></Remove>
      </a>
    </div>
  </div>
</template>
<script src="./script.js"></script>
