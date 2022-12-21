<template>
  <div
    v-show="open"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="w-96 p-6 mx-4 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Edit Note</h3>
      </div>
      <div class="mt-4">
        <WriteNote :onEdit="true" :currentNote="note"> </WriteNote>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
