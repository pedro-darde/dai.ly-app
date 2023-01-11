import swalMixin from "@/mixins/SwalMixin";

export default {
    mixins: [swalMixin],
    methods: {
        async showTaskInfo(tasks) {
            await this.showInfo("<ul>" + tasks.map(task => `<li>${task.title}</li>`).join("") + "</ul>", "Tasks")
        }
    }
}