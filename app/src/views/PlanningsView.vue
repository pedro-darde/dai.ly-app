<template>
  <div class="plannings">
    aasdlkmasdkmaskdmaskdmaskdmaskdkasmd
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
    await Promise.all([
      this.$store.dispatch("planning/getMonths"),
      this.$store.dispatch("planning/getItemTypes"),
      this.$store.dispatch("planning/getCards"),
      this.$store.dispatch("setting/getSettings"),
    ]);
  },
};
</script>
