<script setup>
import quickid from "@/helpers/quickid";
import { defineProps, defineEmits } from "vue";
const emit = defineEmits(["input", "update:modelValue"]);
const props = defineProps({
  value: {
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
  id: {
    type: String,
    default: quickid(),
  },
  placeholder: {
    type: String,
    default: "",
  },
  mask: {
    required: false,
  },
  extraProps: {
    required: false,
  },
  type: {
    type: String,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const model = defineModel()

const emitChange = (event) => {
  emit("update:modelValue", event.target.value);
  emit("input", event.target.value);
  model.value = event.target.value
};


</script>
<template>
  <div>
    <label
      :for="id"
      class="block mb-2 text-md font-bold text-gray-90 text-start"
    >
      {{ label }}
      <span class="text-red-500 italic text-xs" v-if="errorMessage">
        {{ errorMessage }}</span
      >
    </label>
    <input
      :type="type"
      :id="id"
      :class="[
        'bg-white h-[59px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:cursor-not-allowed disabled:bg-slate-100',
        { 'border-red-500': errorMessage },
      ]"
      :placeholder="placeholder"
      :required="required"
      v-bind="extraProps"
      v-mask="mask"
      :disabled="disabled"
      :value="value"
      @input="emitChange"
    />
  </div>
</template>
