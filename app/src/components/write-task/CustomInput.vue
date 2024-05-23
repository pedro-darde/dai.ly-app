<script setup>
const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue", "input"])
const emitChange = (event) => {
    console.log("vou mudar", event.target.value)
    emit('update:modelValue', event.target.value)
    emit('input', event.target.value)
}
</script>

<template>
    <input type="text" :value="props.modelValue" @input="emitChange"/>
</template>