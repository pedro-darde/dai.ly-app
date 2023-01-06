<template>
  <RawPopup v-if="visible" @disband="disband">
    <p>editar task e.e {{ task.id }}</p>
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
