<template>
  <RawPopup v-if="visible" @disband="disband">
    <div class="container mx-auto p-4">
        <p class="text-2xl mb-2 font-bold">Edit your task</p>
      <form @submit.prevent="saveTask">
        <div class="grid md:grid-cols-2 md:gap-6 mb-6">
          <Input v-model="editTask.title" type="text" label="Title"/>
          <Input v-model="editTask.startAt" type="datetime-local" label="Start(ed) at"/>
        </div>
        <div class="grid md:grid-cols-3 md:gap-3 mb-6">
          <Input
              v-model="editTask.expectedTime"
              type="number"
              :extraProps="{ step: 0.1 }"
              label="Expected Time (days)"
          />
          <Input v-model="editTask.expectedDate" type="datetime-local" label="Expected Date" :required="false"/>
          <Select v-model="editTask.status" :options="status" label="Status"></Select>
        </div>
        <div class="mb-6">
          <Textarea v-model="editTask.about" type="text" label="About"/>
        </div>
        <div class="flex justify-end">
          <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save task
          </button>
        </div>
      </form>
    </div>
  </RawPopup>
</template>

<script src="./script.js"></script>

<style scoped>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
