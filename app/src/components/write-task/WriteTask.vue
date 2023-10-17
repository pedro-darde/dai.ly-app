<script setup>
import Input from "@/components/input/Input.vue";
import Select from "../select/Select.vue";
import Wsiwyg from "../wsiwyg/Wsiwyg.vue";
import { onMounted, ref, watch } from "vue";
import { TaskStatusNew } from "@/constants/TaskStatus";
import { useStore } from "vuex";
import { toHtmlDateTimeFormat } from "@/helpers/DateFormatter";
const $store = useStore()
const task = ref({
  task: {
    title: "",
    about: "",
    expectedTime: null,
    startAt: toHtmlDateTimeFormat(new Date()),
    status: "0",
  }
});
const status = ref(TaskStatusNew);
function setTask() {
  const currentTask = $store.getters["task/taskGetter"];
  console.log(currentTask)
  task.value = { ...currentTask };
}
async function saveTask() {
  await $store.dispatch("task/saveTask", task.value);
  await $store.dispatch("task/getActiveTasks");
  setTask();
}

onMounted(() => {
  setTask();
})

watch(task, (value) => {
  $store.dispatch("task/setCurrentTask", value);
}, { deep: true })

</script>
<template>
  <div class="container mx-auto p-4">
    <p class="text-2xl mb-2 font-bold">Write your task</p>
    <form @submit.prevent="saveTask">
      <div class="grid md:grid-cols-2 md:gap-6 mb-6">
        <Input v-model="task.title" label="Title" /> 
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
        <Select 
          v-model="task.status" 
          :options="status" 
          label="Status"></Select>
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

