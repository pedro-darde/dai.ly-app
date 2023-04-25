import NavbarComponent from "../nav/Navbar.vue";
import Header from "../header/Header.vue";
import Input from "../input/Input.vue";
import plus from "../icons/plus.vue";
import remove from "../icons/remove.vue";
import Select from "../select/Select.vue";
import { SETTING_VALUE_TYPES } from "@/constants/SettingValueTypes";
import { makeDefaultSetting } from "@/store/modules/setting";
export default {
  components: {
    NavbarComponent,
    Header,
    Input,
    plus,
    remove,
    Select,
  },
  data() {
    return {
      valueTypeOptions: SETTING_VALUE_TYPES,
      settingsToRemove: [],
    };
  },
  computed: {
    settings: {
      set(value) {
        this.$store.dispatch("setting/applyCurrentSettings", value);
      },
      get() {
        return this.$store.state.setting.settings;
      },
    },
  },
  methods: {
    addSetting() {
      this.settings.push(makeDefaultSetting());
    },
    removeSetting(id) {
      if (this.isIdFromDB(id)) {
        this.settingsToRemove.push(id);
      }
      this.settings = this.settings.filter((setting) => setting.id !== id);
    },
    isLastItem(item) {
      return this.settings.indexOf(item) === this.settings.length - 1;
    },
    isIdFromDB: (id) => !isNaN(+id),
  },
  watch: {
    settings: {
      handler(value) {
        this.settings = value;
      },
      deep: true,
    },
  },
};
