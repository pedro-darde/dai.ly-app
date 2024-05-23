import { useSwal } from "@/mixins/SwalMixin";


export function useNoteInfo() {
    const { showInfo } = useSwal()
    const showNotesInfo = async (notes) => { 
        await showInfo("<ul>" + notes.map(note => `<li>${note.description}</li>`).join("") + "</ul>", "Notas")
    }

    return {
        showNotesInfo
    }
}