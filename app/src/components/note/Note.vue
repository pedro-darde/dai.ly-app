<template>
  <div class="flex items-center space-x-4 cursor-pointer">
    <div class="flex-1 min-w-0">
      <p class="text-xl font-bold truncate">
        {{ note.created_at | toDateBR }}
      </p>
      <!-- <Wsiwyg v-model="note.description"/> -->
      <p class="text-lg text-gray-500 truncate" v-html="note.description"></p>
    </div>
    <div
      class="inline-flex items-center text-base font-semibold text-gray-900 p-2"
    >
      <a
        @click="removeNote()"
        href="#"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-red-400"
      >
        <Remove></Remove>
      </a>
      <a
        @click="editNote()"
        href="#"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-yellow-600"
      >
        <Pencil></Pencil>
      </a>
    </div>
    <EditNote
      v-model="popupEditNoteVisible"
      :note="note"
      @isVisible="handlePopup"
    />
  </div>
</template>
<script src="./script.js"></script>
