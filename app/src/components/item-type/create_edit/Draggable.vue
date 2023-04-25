<template>
  <div class="treeview">
    <draggable
      v-model="items"
      :options="{ group: { name: 'tree' } }"
      @end="handle"
      :move="checkMove"
      class="draggable"
    >
      <template v-for="node in items">
        <div class="node" :key="node.id">
          <div class="handle drag-handle">
            <font-awesome-icon icon="fa-solid fa-bars" />
          </div>
          {{ node.description }}
          <div v-if="node.children" class="children">
            <treeview-draggable :items="node.children"></treeview-draggable>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "treeview-draggable",
  components: {
    draggable,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handle(event) {
      const typeTo = event.from;
      const typeFrom = event.to;
      console.log(event);
    },
    checkMove(event) {
      const {
        draggedContext: { element: draggedElement },
        relatedContext: { element: relatedElement },
      } = event;

      if (draggedElement.children && draggedElement.children.length)
        return false;
      return true;
    },
  },
};
</script>

<style lang="scss">
.treeview {
  margin: 1rem;
  font-size: 1.2rem;
}

.node {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin: 0.5rem 0;
  background-color: #f9f9f9;
}

.handle {
  margin-right: 0.25rem;
  cursor: move;
}

.children {
  margin-left: 0.25rem;
  display: flex;
  flex-direction: column;
}
.draggable {
}
</style>
