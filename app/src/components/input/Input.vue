<script setup>
import quickid from "@/helpers/quickid";
import { defineProps, defineEmits } from "vue";
const emit = defineEmits(["input", 'update:modelValue'])
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
    required: false
  },
  extraProps: {
    required: false
  },
  type: { 
    type: String
  }
})

const emitChange = (event) => {
  emit('update:modelValue', event.target.value)
  emit('input', event.target.value)
}


</script>
<template>
  <div>
    <label
      :for="id"
      class="block mb-2 text-md font-bold text-gray-90 text-start"
    >
      {{ label }}</label>
    <input
      :type="type"
      :id="id"
      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:cursor-not-allowed disabled:bg-slate-100"
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

