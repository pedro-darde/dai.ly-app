<template>
  <div>
    <label
      :for="id"
      class="block mb-2 text-md font-bold text-gray-90 text-start"
    >
      {{ label }}</label
    >
    <input
      v-model="text"
      :type="type"
      :id="id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :placeholder="placeholder"
      :required="required"
      v-bind="extraProps"
      v-mask="mask"
    />
  </div>
</template>
<script src="./script.js"></script>
