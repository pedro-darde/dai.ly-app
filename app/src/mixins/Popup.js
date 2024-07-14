import { getCurrentInstance } from "vue";
import { ref } from "vue";

export function popupVisibility() {
  const visible = ref(true);
  const { emit } = getCurrentInstance();

  const disband = () => {
    console.log("estou no disband");
    visible.value = false;
    emit("isVisible", !!visible.value);
  };
  return {
    disband,
    visible,
  };
}

export function usePopup() {
  const toggled = ref(false);

  function togglePopup() {
    console.log("togglePopup", toggled.value);
    toggled.value = !toggled.value;
  }
  return {
    togglePopup,
    toggled,
  };
}
