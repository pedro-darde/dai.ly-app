import { popupVisibility } from "@/mixins/Popup";
import RawPopup from "../popup/RawPopup.vue";
import Input from "../input/Input.vue";
import Select from "../select/Select.vue";
import Textarea from "../textarea/TextArea.vue";
import { TaskStatusEdit } from "@/constants/TaskStatus";

export default {
  mixins: [popupVisibility],
  components: {
    RawPopup,
    Input,
    Select,
    Textarea,
  },
  data() {
    return {
      status: TaskStatusEdit,
      editTask: { ...this.task },
    };
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    saveTask() {
      this.$emit("saveTask", this.editTask);
    },
  },
  watch: {
    visible(value) {
      if (!value) this.editTask = { ...this.task };
    },
  },
};
