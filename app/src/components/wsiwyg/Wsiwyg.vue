<template>
  <vue-editor v-model="text" :value="value" :disabled="disabled" />
</template>

<script src="./script.js"></script>
<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
</style>
