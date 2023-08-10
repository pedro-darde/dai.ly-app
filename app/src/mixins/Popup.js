import { ref } from "vue";
import { computed, defineProps } from "vue";

export const popupVisibility = () => {
  const { value } = defineProps({
    value: {
      required: true
    }
  })

  const emit = defineEmits("isVisible")
  const visible = computed(() => ({
      get() {
        return value
      },
      set(isVisible) {
        emit("isVisible", !!isVisible)
      }
  }))
 
  const disband = () => {
    visible = false;
  }
  return {
    disband,
    visible
  }
};


export function usePopup(name, defaultVisible = false) {
  const toggled = ref(defaultVisible)
  return {
  togglePopup() {
    toggled.value = !toggled.value
  },
  toggled
 }
}
