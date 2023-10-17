<template>
  <div class="all-notes">
    <AllNotes v-if="!loading"></AllNotes>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AllNotes from "../components/all-notes/AllNotes.vue";
const loading = ref(true)
import { useStore } from "vuex";
const $store = useStore()
  onMounted(async () => {
    console.log("estou indo pegar todas notas")
    await Promise.all([$store.dispatch("note/allNotes"), $store.dispatch("task/getAllTasks")])
    loading.value = false

  });  
</script>
