import { useSwal } from "@/mixins/SwalMixin";

export function useTaskInfo() {
    const { showInfo } = useSwal();

    const showTaskInfo = async(tasks) => { 
        await showInfo("<ul>" + tasks.map(task => `<li>${task.title}</li>`).join("") + "</ul>", "Tasks"); 
    }
    return { 
        showTaskInfo
    }
}