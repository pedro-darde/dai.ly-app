import { Confirm, Info, Toast } from "@/lib/sweetalert";

export default {
  methods: {
    async showConfirm(
      html = "",
      message = "Você tem certeza que deseja remover o registro ?",
      icon = "warning"
    ) {
      return await Confirm(message).fire({
        icon,
        html,
      });
    },
    async showInfo(
      html = "",
      message = "Você tem certeza que deseja remover o registro ?"
    ) {
      return await Info(message).fire({
        html,
      });
    },
    async toastError(message) {
      await Toast.fire({
        text: message,
        icon: "error",
        position: "center",
      });
    },
    async toastSuccess(message) {
      await Toast.fire({
        icon: "success",
        text: message,
      });
    },
  },
};
