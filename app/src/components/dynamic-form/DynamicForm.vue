<template>
  <form @submit="onSubmit">
    <div v-for="{ as, name, label, ...attrs } in schema.fields" :key="name">
      <!-- <label :for="name" class="text-start">{{ label }}</label> -->
      <component
        :is="as"
        :id="name"
        :name="name"
        v-bind="{ ...attrs, name, label }"
        v-model="fieldsRefs[name].value"
        :error-message="errors[name]"
      >
      </component>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
<script setup>
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { defineProps } from "vue";
import * as yup from "yup";
const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
});

defineEmits(["submit"]);

const schemaObject = props.schema.fields.reduce((acc, field) => {
  acc[field.name] = field.rules;
  return acc;
}, {});

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({ ...schemaObject }),
});

const fieldsRefs = props.schema.fields.reduce((acc, field) => {
  const [ref, _] = defineField(field.name, field.rules);
  acc[field.name] = ref;
  return acc;
}, {});

// cons
console.log({ schemaObject, fieldsRefs });
// const schema = yup.object();

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
