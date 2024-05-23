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
      <Wsiwyg v-model="note.description" :disabled="onView"></Wsiwyg>

      <Select
        :disabled="onView"
        option-text="title"
        option-value="id"
        :options="tasks"
        label="Tasks"
        v-model="note.tasks"
        multiple
      ></Select>
      <div class="flex justify-end mt-2">
        <a
          v-if="!onView"
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

<script setup>
import Ok from "../icons/ok.vue";
import { useStore } from "vuex";
import Select from "../select/Select.vue";
import Wsiwyg from "../wsiwyg/Wsiwyg.vue";
import { computed, onMounted, watch } from "vue";
import { ref } from "vue";
const emit = defineEmits(['saved'])
    const props = defineProps({
      onEdit: {
        type: Boolean,
        default: false,
      },
      currentNote: {
        type: Object,
        required: false,
      },
      onView: {
        type: Boolean,
        default: false,
      },
    })
    const $store = useStore();
    
    const note = ref({
      description: "",
      fixed: false,
      tasks: [],
    })

    async  function saveNote() {
      const action = props.onEdit ? "note/editNote" : "note/saveNote";
      await $store.dispatch(action, {
        ...note.value,
        ...tasksToInsertAndToRemove(),
      });
      await $store.dispatch("note/getLatestNotes");
      if (!props.onEdit) {
        const currentNote = $store.getters["note/noteGetter"];
        note.value = { ...currentNote };
        return;
      }
      emit("saved");
    }
    function tasksToInsertAndToRemove() {
      if (!props.onEdit) return null;
      const toInsert = note.value.tasks?.filter(
        (task) => !props.currentNote?.tasks?.includes(task)
      );
      const toRemove = props.currentNote?.tasks?.filter(
        (task) => !note.value.tasks?.includes(task)
      );
      return {
        tasksToInsert: toInsert,
        tasksToRemove: toRemove,
      };
    }
    
    const tasks = computed(() => {
      return $store.getters["task/allTasksGetter"];
    })

  watch(note, (value) => {
    if (!props.onEdit) {
      $store.dispatch("note/setCurrentNote", value);
    }
  }, { deep: true})

onMounted(() => {
  if (!props.onEdit) {
    const currentNote = $store.getters["note/noteGetter"];
    note.value= { ...currentNote };
    return;
  }
  note.value = { ...props.currentNote };
})
</script>