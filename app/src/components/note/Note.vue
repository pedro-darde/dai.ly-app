<template>
  <div class="flex flex-col items-center space-x-4 cursor-pointer">
    <Card>
      <template #title>Note #{{ note.id }}</template>
      <template #content>
      <div
      class="flex flex-row items-center text-base font-semibold text-gray-900 p-2 justify-center w-full"
    >
      <div class="flex-auto">
        <p
          class="text-lg text-gray-500 truncate"
          v-html="note.description"
          v-trim
        ></p>
      </div>

      <div class="flex-1 flex-row self-end">
        <Button icon="pi pi-pencil" type="button" @click="editNote()"  />
        <Button icon="pi pi-trash" type="button" @click="removeNote()" style="color: red"/> 
      </div>
    </div>
    <div class="flex-1 min-w-0 flex-row self-start">
      <p class="text-sm italic font-bold truncate">
        {{ $filters.toDateBR(note.created_at) }}
      </p>
    </div>
    </template>
    </Card>
    <EditNote
      v-if="toggled"
      :note="note"
      @isVisible="handlePopup"
    />
  </div>
</template>
<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import Remove from "../icons/remove.vue";
import EditNote from "../edit-note/EditNote.vue";
import { usePopup } from "@/mixins/Popup";
import Pencil from "../icons/pencil.vue";
import { ref, defineProps } from "vue"
import { useStore } from "vuex";
import {  useSwal } from "@/mixins/SwalMixin";
import {useFilters} from "@/filters";
const $store = useStore();
const { note } = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const $filters = useFilters();

const { togglePopup, toggled } = usePopup();
const showEdit = ref(false);
const { showConfirm } = useSwal();

async function removeNote() {
  let html = " ";
  if (note.tasks?.length) {
    html +=
      "This note has linked tasks, if you remove, this link will be removed to!";
  }
  const res = await showConfirm(
    html,
    "Are you shure you want to remove ?"
  );
  if (res.isConfirmed) {
    await $store.dispatch("note/removeNote", note.id);
    await $store.dispatch("note/getLatestNotes");
  }
}

function editNote() {
  togglePopup(!toggled.value);
}

function closeModal() {
  showEdit.value = false;
}

function openModal() {
  showEdit.value = true;
}

function handlePopup(value) {
  togglePopup(value);
}

</script>
