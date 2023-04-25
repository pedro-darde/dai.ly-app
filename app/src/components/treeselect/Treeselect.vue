<template>
  <div>
    <label
      :for="id"
      class="block mb-2 text-md font-bold text-gray-90 text-start"
    >
      {{ label }}</label
    >
    <Treeselect
      :multiple="false"
      :placeholder="placeholder"
      v-model="text"
      :disable-branch-nodes="true"
      noChildrenText="Dont have children"
      :options="options"
      :flat="false"
      :append-to-body="appendToBody"
    />
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>
