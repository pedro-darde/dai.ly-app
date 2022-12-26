<template>
  <div class="container mx-auto p-2">
    <form>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="mb-6">
          <Input v-model="task.expectedTime" type="number" label="Expected Time" />
        </div>
        <div class="relative z-0 mb-6 w-full group"></div>
      </div>
    </form>
  </div>
</template>
<script src="./script.js"></script>
