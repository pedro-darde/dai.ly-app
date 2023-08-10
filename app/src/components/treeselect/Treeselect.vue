<template>
  <div >
    <ul class="py-2 px-4 bg-gray-800 text-white rounded-md ">
      <li>
        <button @click="toggleDropdown">aa a a a </button>
        <div v-if="dropdownVisible">
          <ul
              class="bg-white w-48 py-2 px-4 shadow-md rounded-md"
          >
            <li v-for="selectedNode in selectedNodes" :key="selectedNode.id">
              {{ selectedNode.label }}
            </li>
          </ul>
        </div>
      </li>
      <TreeItem
          v-for="node in options"
          :key="node.id"
          :node="node"
          :multiple="multiple"
          @toggleSelection="toggleSelection"
          :class="treeItemClass"
      />
    </ul>
  </div>
</template>


<script setup>
import {computed, ref, watch} from 'vue';
import TreeItem from './TreeItem.vue';
const dropdownVisible = ref(false);
const selectedNodes = ref([]);

const { multiple, value, options } = defineProps({
  multiple: {
    type: Boolean,
    default: false, // Allow multiple item selection by default
  },
  value: {
    required: true
  },
  options: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(["update:value"])

const toggleSelection = (nodeId) => {
  console.log("mudoyu")
  const node = findNodeById(options, nodeId);
  if (node) {
    node.selected = !node.selected;

    // Handle multiple item selection
    if (!multiple) {
      // If not multiple selection, clear the previous selection and only keep the current selection
      selectedNodes.value.forEach((selectedNode) => {
        if (selectedNode.id !== nodeId) {
          selectedNode.selected = false;
        }
      });
      selectedNodes.value = node.selected ? [node] : [];
    } else {
      if (node.selected) {
        selectedNodes.value.push(node);
      } else {
        const index = selectedNodes.value.findIndex((selectedNode) => selectedNode.id === nodeId);
        if (index !== -1) {
          selectedNodes.value.splice(index, 1);
        }
      }
    }
    emit('update:modelValue', multiple ? selectedNodes.value.map((node) => node.id) : selectedNodes.value[0]?.id);
  }
};
const findNodeById = (nodes, nodeId) => {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return node;
    }
    if (node.children && node.children.length) {
      const foundNode = findNodeById(node.children, nodeId);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
};

const treeItemClass = `
  px-2 py-1
  cursor-pointer
`;

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

watch(() => value, (newValue) => {
  if (multiple) {
    selectedNodes.value = newValue.map((id) => findNodeById(options, id)).filter(Boolean);
  } else {
    selectedNodes.value = [findNodeById(options, newValue)].filter(Boolean);
  }
});
</script>

<style>
/* Custom style for the dropdown container */
.dropdown-container {
  position: relative;
}
</style>
