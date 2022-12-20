<template>
  <div class="home">
    <Notes />
  </div>
</template>

<script>
import Notes from "../components/notes/Notes.vue";

export default {
  name: "HomeView",
  components: {
    Notes,
  },
};
</script>
