import NavbarComponent from '../nav/Navbar.vue'
import Header from '../header/Header.vue'
import {mapGetters} from 'vuex'
import {REJECTED, VALIDATED} from "@/constants/TaskStatus";
import notesInfo from "@/mixins/notes-info";

export default {
    mixins: [notesInfo],
    components: {
        NavbarComponent, Header
    },
    methods: {
        isTaskValidated(task) {
            return task.status === VALIDATED
        },
        getBgColor(task) {
            if (task.status === REJECTED) return "bg-red-200"
            if (task.timeSpent > task.expectedTime) return "bg-yellow-200"
            return "bg-green-200"
        },
        getInfoTask(task) {
            if (task.status === REJECTED) return "Note rejected"
            if (task.timeSpent > task.expectedTime) return "Warning! This task take more days than expected!"
            return "Task done in time!"
        },
        getNotesTask() {

        }
    },
    computed: {
        ...mapGetters({
            tasks: "task/tasksRejectedAndValidatedGetter",
        }),
    }
}
