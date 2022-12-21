import Swal from "sweetalert2";

export const ConfirmRemove = Swal.mixin({
  title: "Você tem certeza que deseja remover o registro ?",
  showDenyButton: true,
  showCancelButton: false,
  confirmButtonText: "Sim",
  denyButtonText: "Cancelar",
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
