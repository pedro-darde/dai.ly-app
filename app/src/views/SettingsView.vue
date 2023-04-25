<template>
  <div class="settings">
    <Settings />
  </div>
</template>
<script>
import Settings from "../components/settings/Settings.vue";
export default {
  components: { Settings },
  async mounted() {
    await this.$store.dispatch("setting/getSettings");
  },
};
</script>
