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
<script setup>


import quickid from "@/helpers/quickid";
import { ref, watch, defineEmits, onMounted } from "vue";


const emit = defineEmits(["input"])
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
  options: {
    required: true,
    type: [Array, Object],
  },
  optionText: {
    required: false,
    type: String,
  },
  optionValue: {
    required: false,
    type: String,
  },
  multiple: {
    required: false,
    default: false,
  },
  useItemAsValue: {
    required: false,
    type: Boolean,
    default: false,
  },
})

const text = ref(props.value)

const  getOptionValue = (item, key) => {
  if (props.useItemAsValue) return item;
  if (props.optionValue) return item[props.optionValue];
  return key;
}
const getOptionText = (item) => {
  if (props.optionText) return item[props.optionText];
  return item;
}

watch(text, (value) => {
  emit("input", value);
})

watch(props.value, (value) => {
  text.value = value
})

</script>