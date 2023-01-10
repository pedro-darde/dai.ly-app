<template>
  <div class="flex items-center space-x-4 cursor-pointer">
    <div class="flex-1 min-w-0">
      <p class="text-xl font-bold truncate">
      </p>
      <p class="text-lg text-gray-500 truncate">
        {{ task.title }}
      </p>
    </div>
    <div
        class="inline-flex items-center text-base font-semibold text-gray-900 p-2"
    >
      <a class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue-600" v-if="notes?.length"
         @click="showNotesInfo(notes)" title="Visualizar notas">
        <Eye></Eye>
      </a>
      <a
          @click="removeTask()"
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-red-400"
      >
        <Remove></Remove>
      </a>
      <a
          @click="editTask()"
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-yellow-600"
      >
        <Pencil></Pencil>
      </a>
      <a class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-green-400" v-if="canMarkAsDone"
         @click="markAsDone">
        <Check></Check>
      </a>

    </div>
    <EditTask
        v-model="popupEditTaskVisible"
        @saveTask="saveEdit"
        :task="task"
        @isVisible="handlePopup"
    />
  </div>
</template>
<script src="./script.js"></script>
