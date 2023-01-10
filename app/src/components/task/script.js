import SwalMixin from "@/mixins/SwalMixin";
import Remove from "../icons/remove.vue";
import EditTask from "../edit-task/EditTask.vue";
import {usePopup} from "@/mixins/popup";
import Pencil from "../icons/pencil.vue";
import Check from "@/components/icons/check.vue";
import Eye from "@/components/icons/eye";
import {DONE, REJECTED} from "@/constants/TaskStatus";
import notesInfo from "@/mixins/notes-info";

export default {
    mixins: [SwalMixin, usePopup("editTask"), notesInfo],
    components: {Remove, Pencil, EditTask, Check, Eye},
    data: () => ({
        showEdit: false,
    }),
    props: {
        task: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async removeTask() {
            let message = "Você tem certeza que deseja remover o registro ? ";
            if (this.task.hasNotes) {
                message += "O mesmo possuí vínculo com notas e ao excluir esse vínculo será removido!"
            }
            const res = await this.showConfirm(message);
            if (res.isConfirmed) {
                await this.$store.dispatch("task/removeTask", {id: this.task.id, hasNotes: this.task.hasNotes});
                await this.$store.dispatch("task/getActiveTasks");
            }
        },
        editTask() {
            this.toggleEditTask(!this.popupEditTaskVisible);
        },
        closeModal() {
            this.showEdit = false;
        },
        openModal() {
            this.showEdit = true;
        },
        handlePopup(value) {
            this.toggleEditTask(value);
        },
        async saveEdit(editTask) {
            await this.$store.dispatch("task/editTask", editTask)
            await this.$store.dispatch("task/getActiveTasks")
            this.handlePopup(false)
        },
        async markAsDone() {
            if (!this.task.startAt || new Date(this.task.startAt).getTime() > (new Date()).getTime()) {
                await this.showConfirm("<p>A <b>Data de Início</b> da Task tem que ser anterior a data atual para poder ser finalizada! Para realizar tal ação atualize a <b>Data de Início</b></p>", "Data de Início Inválida", "error")
                return
            }
            const res = await this.showConfirm("<p> A task irá ser finalizada e poderá ser vista na aba de Finalizadas/Rejeitadas! </p>", "Marcar task como validada ?", "question");
            if (res.isConfirmed) {
                await this.$store.dispatch("task/markAsDone", this.task)
                await this.$store.dispatch("task/getActiveTasks")
                this.handlePopup(false)
            }
        },
    },
    computed: {
        canMarkAsDone() {
            return !([DONE, REJECTED].includes(this.task.status))
        },
        notes() {
            const allNotes = this.$store.getters['note/allNotesGetter']
            return allNotes.filter(({id}) => this.task.notes.includes(id))
        }
    }
};
