import { ConfirmRemove } from "@/lib/sweetalert";

export default {
  methods: {
    async showConfirm() {
      return await ConfirmRemove.fire({
        icon: "warning",
      });
    },
  },
};
