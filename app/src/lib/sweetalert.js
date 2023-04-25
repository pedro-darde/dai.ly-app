import Swal from "sweetalert2";

export const Confirm = (message) =>
  Swal.mixin({
    title: message,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Sim",
    denyButtonText: "Cancelar",
  });

export const Info = (message) =>
  Swal.mixin({
    title: message,
    showDenyButton: false,
    showCancelButton: false,
    icon: "info",
  });

export const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
