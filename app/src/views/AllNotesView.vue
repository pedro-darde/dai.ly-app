<template>
  <div class="all-notes">
    <AllNotes></AllNotes>
  </div>
</template>

<script>
import AllNotes from "../components/all-notes/AllNotes.vue";
export default {
  components: { AllNotes },
  async created() {
    await Promise.all([this.$store.dispatch("note/allNotes"), this.$store.dispatch("task/getAllTasks")])
  },
};
</script>
