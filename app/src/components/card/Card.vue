<template>
  <div
    :class="['ml-1.5 flex flex-col p-6 rounded-lg shadow-lg max-w-sm', classes]"
  >
    <slot name="title">
      <p>Card Title Here</p>
    </slot>
    <p class="text-gray-700 text-base mb-4">
      <slot name="content">
      </slot>
    </p>
    <div class="time-info mt-auto">
      <slot name="extra-info">
        <p>Put here some extra info about</p>
      </slot>
    </div>
  </div>
</template>

<script src="./script.js"></script>
