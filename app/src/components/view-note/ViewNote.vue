<template>
  <RawPopup v-if="visible" @disband="disband">
    <WriteNote
      :currentNote="note"
      :onEdit="true"
      @saved="disband"
      :onView="true"
    ></WriteNote>
  </RawPopup>
</template>

<script src="./script.js"></script>

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
