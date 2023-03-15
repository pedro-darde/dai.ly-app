import swalMixin from "@/mixins/SwalMixin";

export default {
    mixins: [swalMixin],
    methods: {
        async showNotesInfo(notes) {
            await this.showInfo("<ul>" + notes.map(note => `<li>${note.description}</li>`).join("") + "</ul>", "Notas")
        }
    }
}