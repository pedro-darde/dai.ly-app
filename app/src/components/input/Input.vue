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
      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:cursor-not-allowed disabled:bg-slate-100"
      :placeholder="placeholder"
      :required="required"
      v-bind="extraProps"
      v-mask="mask"
      :disabled="disabled"
      :value="value"
    />
  </div>
</template>
<script src="./script.js"></script>
