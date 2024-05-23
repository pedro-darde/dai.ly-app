<template>
  <RawPopup  @disband="disband" v-if="visible">
    <WriteNote :currentNote="note" :onEdit="true" @saved="disband"></WriteNote>
  </RawPopup>
</template>

<script setup>
import WriteNote from "../write-note/WriteNote.vue";
import { popupVisibility } from "@/mixins/Popup";
import RawPopup from "../popup/RawPopup.vue";
import { defineEmits } from "vue"
const emit = defineEmits(["isVisible"]);
const { visible, disband } = popupVisibility(emit);
const { note } = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

</script>

<style scoped>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
