<template>
  <div class="home">
    <Notes msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Notes from "../components/notes/Notes.vue";

export default {
  name: "HomeView",
  components: {
    Notes,
  },
};
</script>
