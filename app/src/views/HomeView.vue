<template>
  <div class="home">
    <router-view>
      <Notes />
    </router-view>
  </div>
</template>

<script>
import Notes from "../components/notes/Notes.vue";

export default {
  name: "HomeView",
  components: {
    Notes,
  },
  created() {
    console.log("app criado");
  },
};
</script>
