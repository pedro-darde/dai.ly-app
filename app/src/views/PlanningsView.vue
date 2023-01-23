<template>
  <div class="plannings">
    <Plannings />
  </div>
</template>

<script>
import Plannings from "@/components/plannings/Plannings.vue";
export default {
  components: {
    Plannings,
  },
  async created() {
    await this.$store.dispatch("planning/getMonths");
  },
};
</script>
