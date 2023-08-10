<template>
  <li>
    <span>
      <input
          type="checkbox"
          :checked="node.selected"
          @change="toggleSelection(node.id)"
      />
      <span @click="toggleNode" class="tree-label">
        {{ node.label }}
        <span v-if="node.children && node.children.length" @click.stop="toggleNode">
            <i
                v-if="node.expanded"
                class="mr-2 text-gray-500"
            >
              {{ node.expanded ? "-" : "-"}}
            </i>
        </span>
      </span>
    </span>
    <ul v-if="node.expanded && node.children && node.children.length" class="pl-4">
      <TreeItem
          v-for="childNode in node.children"
          :key="childNode.id"
          :node="childNode"
          :multiple="multiple"
          :selectedNodes="selectedNodes"
          @toggleSelection="toggleSelection"
          @hasSelectedSiblings="hasSelectedSiblings = true"
      />
    </ul>
  </li>
</template>

<script setup>
import { ref } from 'vue';


const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  multiple:{
    type: Boolean
  },
  selectedNodes: {
    type: Array
  }
})

let hasSelectedSiblings = ref(false);

const emit = defineEmits(['toggleSelection'])

const node = ref(props.node);
const toggleNode = () => {
  node.value.expanded = !node.value.expanded;
};

const hasSelectedNodes = ref(false);
if (!props.multiple) {
  hasSelectedNodes.value = node.value.selected;
}
const toggleSelection = (nodeId) => {
  emit('toggleSelection', nodeId);
};
</script>

<style lang="scss">
.tree-label  {
  i {
    font-size: 14px;
    padding: 4px;
  }
  text-align: center;
  font-weight: bold;
  padding: 5px;
}

</style>
