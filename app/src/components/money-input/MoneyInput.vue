<template>
  <div>
    <label
      :for="id"
      class="block mb-2 text-md font-bold text-gray-90 text-start"
    >
      {{ label }}</label
    >
    <input
      type="text"
      ref="inputRef"
      :id="id"
      class="h-[59px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :placeholder="placeholder"
      :required="required"
      v-bind="extraProps"
      :value="formattedValue"
    />
  </div>
</template>

<script src="./script.js"></script>
