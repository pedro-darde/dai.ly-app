<template>
  <div class="container mx-auto p-4">
    <p class="text-2xl mb-2 font-bold">Write your task</p>
    <form @submit.prevent="saveTask">
      <div class="grid md:grid-cols-2 md:gap-6 mb-6">
        <Input v-model="task.title" type="text" label="Title" />
        <Input
          v-model="task.startAt"
          type="datetime-local"
          label="Start(ed) at"
        />
      </div>
      <div class="grid md:grid-cols-2 md:gap-2 mb-6">
        <Input
          v-model="task.expectedTime"
          type="number"
          :extraProps="{ step: 0.1 }"
          label="Expected Time (days)"
        />
        <Select v-model="task.status" :options="status" label="Status"></Select>
      </div>
      <div class="mb-6">
        <Wsiwyg v-model="task.about"></Wsiwyg>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="text-white bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Save task
        </button>
      </div>
    </form>
  </div>
</template>
<script src="./script.js"></script>
