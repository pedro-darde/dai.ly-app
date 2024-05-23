<template>
  <div
    tabindex="0"
    :data-uid="uid"
    class="popup"
    @click="click"
    @keyup.esc="click"
  >
    <div ref="dialog" :class="classes" :style="style">
      <div class="inner-panel">
        <slot>
          <h3>Ulá!</h3>
          <p>Adicione algum conteudo</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>

import quickid from "../../helpers/quickid";
import {computed, nextTick, ref} from "vue";

const emit = defineEmits(['disband'])
const props = defineProps({
  sizes: {
    type: Array,
    required: false,
  },
  width: {
    type: String,
    default: "fit-content",
  },
  widthSmall: {
    type: String,
    default: "100%",
  },
  sizes: {
    type: String,
    required: false,
  },
  noDisband: {
    type: Boolean,
    default: false
  }
})

const overflow = ref(false)
const uid = ref(quickid())
const dialog = ref(null)
const onResize = ($el) => {
  if (!$el) return;
  overflow.value = $el.offsetHeight * 0.95 > window.innerHeight;
}

const click = (event) => {
  if (props.noDisband) return;
  if (event.target.dataset.uid !== uid.value) return;
  emit("disband");
}


nextTick(() => {
  onResize(dialog)
})

const style = computed(() => {
  return { "--popup-width": props.width, "--popup-small": props.widthSmall };
})

const classes = computed(() => {
  return `relative ${props.sizes || "by-width"}`;
})


</script>

<style scoped lang="scss">
.popup::before {
  content: " ";
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  z-index: -1;
  background-color: #0004;
}

.popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  min-height: 100vh;
  z-index: 10;
  overflow: auto;

  background: transparent;
  backdrop-filter: blur(2px);

  display: flex;
  justify-content: center;
  align-items: center;

  .mwp-1200 {
    max-width: 1200px;
  }

  .mwp-600 {
    max-width: 600px;
  }
  .mwp-500 {
    max-width: 500px;
  }
  .mwp-400 {
    max-width: 400px;
  }
  .mwp-300 {
    max-width: 300px;
  }

  .relative {
    position: relative;
  }

  .inner-panel {
    height: fit-content;
    max-height: 85vh;
    overflow-y: auto;
    border-radius: 4px;
    background-color: #f0f0f0;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.322);
  }

  .by-width {
    min-width: 430px;
    width: var(--popup-width);

    @media screen and (max-width: 500px) {
      min-width: unset;
      width: var(--popup-small);
    }
  }

  .close {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0px;
    right: 0px;

    transform: translate(75%, -75%);

    text-align: center;
    i {
      margin-top: 7px;
      font-size: 24px;
      color: rgb(0, 0, 0);

      transition: 1s ease-out;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
