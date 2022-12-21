<template>
  <div class="container mx-auto p-2">
    <p class="text-2xl mb-2 font-bold">Write your note</p>
    <div class="p-6 bg-yellow-200 border border-gray-200 rounded-lg shadow-md">
      <div class="flex justify-end mb-2">
        <label class="inline-flex relative items-end cursor-pointer">
          <input type="checkbox" v-model="note.fixed" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"
          ></div>
          <span class="ml-3 text-sm font-bold text-black">Fixed</span>
        </label>
      </div>

      <textarea
        class="placeholder:italic placeholder:text-slate-400 block bg-yellow-50 w-full border border-slate-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        :rows="10"
        placeholder="Start typing"
        v-model="note.description"
      ></textarea>
      <div class="flex justify-end mt-2">
        <a
          @click="saveNote"
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
        >
          <Ok></Ok>
        </a>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
