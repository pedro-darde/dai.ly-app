<template>
  <div>
    <slot name="label">
      <label
        :for="id"
        class="block mb-2 text-md font-bold text-gray-90 text-start"
      >
        {{ label }}
        <span class="text-red-500 italic text-xs" v-if="errorMessage">
          {{ errorMessage }}</span
        >
      </label>
    </slot>

    <MultiSelect
      :id="id"
      :class="[
        'bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 disabled:cursor-not-allowed disabled:bg-slate-100',
        { 'border-red-500': errorMessage },
      ]"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :value="value"
      @input="emitChange"
      @change="emit('change')"
      :options="toMultiSelectOption"
      :mode="mode"
    >
    </MultiSelect>
  </div>
</template>
<script setup>
import quickid from "@/helpers/quickid";
import MultiSelect from "@vueform/multiselect";
import { computed } from "vue";
const emit = defineEmits(["input", "update:modelValue", "change"]);
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
  errorMessage: {
    type: String,
    default: "",
  },
});

// const teste = [1,2,3,4,5]
function emitChange(value) {
  emit("update:modelValue", value);
  emit("input", value);
}

const getOptionValue = (item, key) => {
  if (props.useItemAsValue) return item;
  if (props.optionValue) return item[props.optionValue];
  return key;
};
const getOptionText = (item) => {
  if (props.optionText) return item[props.optionText];
  return item;
};

const toMultiSelectOption = computed(() => {
  return props.options.map((item, key) => {
    return {
      value: getOptionValue(item, key),
      label: getOptionText(item),
    };
  });
});

const mode = computed(() => {
  return props.multiple ? "tags" : "single";
});
</script>
<style scoped></style>
<style src="@vueform/multiselect/themes/default.css"></style>
