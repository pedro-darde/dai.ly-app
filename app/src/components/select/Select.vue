<template>
  <div>
    <slot name="label">
      <label
        :for="id"
        class="block mb-2 text-md font-bold text-gray-90 text-start"
      >
        {{ label }}</label
      >
    </slot>
    <select
      v-model="text"
      :id="id"
      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 disabled:cursor-not-allowed disabled:bg-slate-100"
      :placeholder="placeholder"
      :required="required"
      :multiple="multiple"
      :disabled="disabled"
      :value="value"
    >
      <slot name="options">
        <option
          v-for="(option, key) in options"
          :value="getOptionValue(option, key)"
          :key="key"
        >
          {{ getOptionText(option) }}
        </option>
      </slot>
    </select>
  </div>
</template>
<script src="./script.js"></script>
