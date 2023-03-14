import { TaskStatusNew } from "@/constants/TaskStatus";
import Input from "../input/Input.vue";
import Textarea from "../textarea/TextArea.vue";
import Select from "../select/Select.vue";
import { throttle } from "lodash";
import { toHtmlDateTimeFormat } from "@/helpers/DateFormatter";
import Wsiwyg from "../wsiwyg/Wsiwyg.vue";
export default {
  components: { Input, Textarea, Select, Wsiwyg },
  data() {
    return {
      task: {
        title: "",
        about: "",
        expectedTime: null,
        startAt: toHtmlDateTimeFormat(new Date()),
        status: "0",
      },
      status: TaskStatusNew,
    };
  },
  methods: {
    async saveTask() {
      await this.$store.dispatch("task/saveTask", this.task);
      await this.$store.dispatch("task/getActiveTasks");
      this.setTask();
    },
    setTask() {
      const currentTask = this.$store.getters["task/taskGetter"];
      this.task = { ...currentTask };
    },
  },
  created() {
    this.setTask();
  },
  watch: {
    task: {
      handler: throttle(function (value) {
        this.$store.dispatch("task/setCurrentTask", value);
      }, 500),
      deep: true,
    },
  },
};
