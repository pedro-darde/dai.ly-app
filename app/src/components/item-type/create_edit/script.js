import RawPopup from "../../popup/RawPopup.vue";
import { popupVisibility } from "@/mixins/Popup";
import Select from "../../select/Select.vue";
import Input from "../../input/Input.vue";
import Treeselect from "../../treeselect/Treeselect.vue";
import { itemTypeService } from "@/services/ItemTypeService";
import SwalMixin from "@/mixins/SwalMixin";
export default {
  mixins: [popupVisibility, SwalMixin],
  components: {
    RawPopup,
    Select,
    Input,
    Treeselect,
  },
  data() {
    return {
      description: "",
      active: true,
      parent: null,
      itemsTypesEdit: [],
    };
  },
  computed: {
    itemTypes: {
      get() {
        return this.$store.getters["planning/itemTypesGetter"];
      },
      set(value) {
        console.log(value);
      },
    },
  },
  methods: {
    async save() {
      await itemTypeService.save({
        description: this.description,
        active: this.active,
        parent_id: this.parent,
      });
      await this.toastSuccess("Item created");
    },
    resetState() {
      this.description = "";
      this.active = true;
      this.parent = null;
    },
  },
  watch: {
    visible(value) {
      if (!value) {
        this.resetState();
      }
    },
  },
};
