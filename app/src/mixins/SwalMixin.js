import { Confirm, Info, Toast } from "@/lib/sweetalert";

export const useSwal = () => { 
  const showConfirm = async (html = "", message = "Você tem certeza que deseja remover o registro ?", icon = "warning") => { 
    return await Confirm(message).fire({ 
      icon, 
      html, 
    }); 
  }

  const showInfo = async (html = "", message = "Você tem certeza que deseja remover o registro ?") => { 
    return await Info(message).fire({ 
      html, 
    }); 
  }

  const toastError = async (message) => { 
    await Toast.fire({ 
      text: message, 
      icon: "error", 
      position: "center", 
    }); 
  }

  const toastSuccess = async (message) => { 
    await Toast.fire({ 
      icon: "success", 
      text: message, 
    }); 
  }

  return {
    showConfirm,
    showInfo,
    toastError,
    toastSuccess,
  }
}