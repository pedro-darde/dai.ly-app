<template>
  <div class="rejectedAndValidated">
    <RejectedAndValidated></RejectedAndValidated>
  </div>
</template>

<script>
import RejectedAndValidated from "../components/tasks-rejected-and-validated/TasksRejectedAndValidated.vue"

export default {
  components: {
    RejectedAndValidated
  },
  async created() {
    await this.$store.dispatch("task/getRejectedAndValidated")
    await this.$store.dispatch("note/allNotes")
  }
}
</script>

<style scoped>

</style>