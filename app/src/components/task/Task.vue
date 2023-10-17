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
      <button
          @click="editTask()"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-yellow-600"
      >
        <Pencil></Pencil>
    </button>
      <a class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-green-400" v-if="canMarkAsDone"
         @click="markAsDone">
        <Check></Check>
      </a>

    </div>
      <EditTask
        v-if="toggled"
        @saveTask="saveEdit"
        :task="task"
        @isVisible="handlePopup"
    />
  </div>
</template>
<script setup>
import { useSwal } from "@/mixins/SwalMixin";
import { usePopup } from "@/mixins/Popup";
import {  useNoteInfo } from "@/mixins/NotesInfo";
import Remove from "@/components/icons/remove.vue";
import Pencil from "@/components/icons/pencil.vue";
import EditTask from "@/components/edit-task/EditTask.vue";
import Check from "@/components/icons/check.vue";
import Eye from "@/components/icons/eye.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";

const showEdit = ref(false);

const { togglePopup, toggled } = usePopup()
const { showConfirm } = useSwal();

const {  showNotesInfo } =  useNoteInfo();
const $store = useStore()

const { task } = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

async function removeTask() {
  let message = "Você tem certeza que deseja remover o registro ? ";
  if (task.hasNotes) {
    message +=
      "O mesmo possuí vínculo com notas e ao excluir esse vínculo será removido!";
  }
  const res = await showConfirm(message);
  if (res.isConfirmed) {
    await $store.dispatch("task/removeTask", {
      id: task.id,
      hasNotes: task.hasNotes,
    });
    await $store.dispatch("task/getActiveTasks");
  }
}

async function markAsDone() {
  if (
    !task.startAt ||
    new Date(task.startAt).getTime() > new Date().getTime()
  ) {
    await showConfirm(
      "<p>A <b>Data de Início</b> da Task tem que ser anterior a data atual para poder ser finalizada! Para realizar tal ação atualize a <b>Data de Início</b></p>",
      "Data de Início Inválida",
      "error"
    );
    return;
  }
  const res = await showConfirm(
    "<p> A task irá ser finalizada e poderá ser vista na aba de Finalizadas/Rejeitadas! </p>",
    "Marcar task como validada ?",
    "question"
  );
  if (res.isConfirmed) {
    await $store.dispatch("task/markAsDone", task);
    await $store.dispatch("task/getActiveTasks");
    handlePopup(false);
  }
}

function editTask() {
  togglePopup(!toggled.value)
}

function closeModal() {
  showEdit.value = false;
}

function openModal() {
  showEdit.value = true;
}

function handlePopup(value) {
  togglePopup(value)
}

async function saveEdit(editTask) {
  await $store.dispatch("task/editTask", editTask);
  await $store.dispatch("task/getActiveTasks");
  handlePopup(false);
}

const canMarkAsDone = computed(() => {
  return !task. done && !task.rejected;
});

const notes = computed(() => {
  const allNotes = $store.getters["note/allNotesGetter"]
  console.log(allNotes);
  return allNotes.filter((note) => {
    return note.tasks?.includes(task.id)
  });
});

</script>
