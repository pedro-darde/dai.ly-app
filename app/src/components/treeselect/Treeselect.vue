<script setup>
import {computed, ref, watch, onMounted, getCurrentInstance, onUnmounted} from 'vue';
const dropDownVisible = ref(false)
const emit = defineEmits(["update:modelValue", "input"])
const { multiple, value, options } = defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  value: {
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  onChildren: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: quickid()
  },
  label: {
    type: String,
    required: true
  }
});

const model = ref(value);

const modalDropDown = ref(null)
const ulDropdown = ref(null)


const mapOptionsRecursive = (options) => {
  return options.map((option) => {
    return {
      ...option,
      id: option.id,
      label: option.label,
      checked: false,
      nodes: option.children?.length ? mapOptionsRecursive(option.children) : []
    }
  })
}
const optionsRefs = ref(mapOptionsRecursive(options))

const handleInput = (item) => {
  if (multiple) {
    if (item.checked) {
      model.value.push(item.id)
    } else {
      model.value = model.value.filter((id) => id !== item.id)
    }
  } else {
    optionsRefs.value.forEach((option) => {
      if (option.id === item.id) return
      option.checked = false
    })
    model.value = item.checked ? item.id : null
  }
  emit('update:modelValue', model.value)
  emit('input', model.value)
}


const dropDownText = computed(() => {
  if (!model.value) return "Select one";
  if (multiple) {
    return model.value.map((item) => {
      return optionsRefs.value.find((option) => option.id === item).label
    }).join(', ')
  }
  return optionsRefs.value.find((option) => option.id === model.value).label
})


const pai = ref(null)

const handleClickDropdownButton = () => dropDownVisible.value = !dropDownVisible.value

defineExpose({ modalDropDown, ulDropdown })


const clickOutSideListener = (event) => {
  if (dropDownVisible.value && modalDropDown.value) {
    if (!modalDropDown.value.contains(event.target) && !pai.value.contains(event.target)) {
      dropDownVisible.value = false
    }
  }
}


function clickOutsideListener (event) {
  if (event.target.id === 'button-dropdown') return
  if (dropDownVisible.value && modalDropDown.value) {
    if (!modalDropDown.value.contains(event.target)) {
      dropDownVisible.value = false
    }
  }
}

onMounted(() => {
  window.addEventListener('click', clickOutsideListener)
})

onUnmounted(() => {
  console.log('desmontando')
  window.removeEventListener('click', clickOutsideListener)
})

const searchText = ref("");
const onNodeExpanded = (node, state) => {
  console.log("state: ", state);
  console.log("node: ", node);
};

const onUpdate = (nodes) => {
  console.log("nodes:", nodes);
};

const onNodeClick = (node) => {
  const nodeFound = optionsRefs.value.find((option) => option.id === node.id)
  if (nodeFound) {
    optionsRefs.value.forEach((option) => {
      if (option.id === nodeFound.id) return
      option.checked = false
    })
    nodeFound.checked = !nodeFound.checked
    model.value = nodeFound.checked ? nodeFound.id : null
    emit('update:modelValue', model.value)
    emit('input', model.value)
    // handleInput(nodeFound)
  }
};

import Tree from "vue3-tree";
import "vue3-tree/dist/style.css";
import quickid from "@/helpers/quickid";

</script>

<style>
.dropdown-container {
  position: relative;
}
</style>


<template>
  <div class="flex flex-col" ref="pai">
    <label
        :for="id"
        class="block mb-2 text-md font-bold text-gray-90 text-start"
    >
      {{ label }}
    </label>
    <button type="button"
            v-if="!onChildren"
            id="button-dropdown"
            :class="['h-[59px] rounded-md bg-slate-200 text-bold text-black font-bold p-2 flex justify-between items-center', dropDownVisible ? 'border-2 border-blue-500' : '']"
            @click="handleClickDropdownButton"
    >
      {{ dropDownText }}
      <p  v-if="dropDownVisible" class="font-bold text-xl"> &darr; </p>
      <p v-else class="font-bold text-xl"> &uarr; </p>
    </button>
    <div v-if="dropDownVisible" class="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg w-44 dark:bg-white-200 shadow-lg" ref="modalDropDown">-
    <Tree
        :nodes="optionsRefs"
        :search-text="searchText"
        :use-checkbox="true"
        :use-icon="false"
        show-child-count
        @nodeExpanded="onNodeExpanded"
        @update:nodes="onUpdate"
        @nodeClick="onNodeClick"
        :undeletable="true"
    >
      <template v-slot:childCount>
        <p  class="font-bold text-xl">&darr; </p>
      </template>
    </Tree>
    </div>



<!--    </button>-->
<!--    <div v-if="dropDownVisible" class="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg w-44 dark:bg-gray-700 shadow-lg" ref="modalDropDown">-->
<!--      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" ref="ulDropdown">-->
<!--        <li  v-for="item in optionsRefs" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">-->
<!--          <treeselect-->
<!--              v-if="item.children.length"-->
<!--              placeholder="Parent"-->
<!--              v-model="model"-->
<!--              :options="item.children"-->
<!--              label="Parent"-->
<!--              :append-to-body="true"-->
<!--              :on-children="true"-->
<!--          />-->
<!--          <input-->
<!--              v-model="item.checked"-->
<!--              type="checkbox"-->
<!--              @change="handleInput($event, item)"-->
<!--          >-->
<!--          {{  item.label }}-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
  </div>
</template>