<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        {{ headerTitle }}
      </h1>
      <slot name="header">
        <p
          class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
        >
          {{ about }}
        </p>
      </slot>
    </div>
  </header>
</template>

<script setup>
defineProps({
  headerTitle: String,
  about: {
    type: String,
    default: "Put a description to your header",
  },
});
</script>
<style scoped></style>
