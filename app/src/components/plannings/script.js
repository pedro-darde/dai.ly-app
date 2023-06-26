import HeaderComponent from "../header/Header.vue";
import NavbarComponent from "../nav/Navbar.vue";
import Select from "../select/Select.vue";
import Planning from "../planning/Planning.vue";
import { range } from "lodash";
import { mapGetters } from "vuex";
import { usePopup } from "@/mixins/Popup";
import BankCard from "../bank-card/card.vue";
import CC from "../icons/cc.vue";
import CreateEditItemType from "../item-type/create_edit/CreateEdit.vue";
import CreateInstallments from "../installments/CreateInstallments.vue";

import { ccService } from "@/services/CCService";
import { Toast } from "@/lib/sweetalert";
export default {
  mixins: [
    usePopup("bankCard"),
    usePopup("itemType"),
    usePopup("installments"),
  ],
  components: {
    NavbarComponent,
    HeaderComponent,
    Select,
    Planning,
    BankCard,
    CC,
    CreateEditItemType,
    CreateInstallments,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      years: range(
        new Date().getFullYear() - 10,
        new Date().getFullYear() + 20
      ),
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;

    setTimeout(async () => {
      await this.$store.dispatch("planning/changePlanningYear", this.year);
      this.loading = false;
    }, 1500);
  },
  methods: {
    createCC() {
      this.toggleBankCard(!this.popupBankCardVisible);
    },
    handleCC(value) {
      this.createCC(value);
    },
    createEditItemType() {
      this.toggleItemType(!this.popupItemTypeVisible);
    },
    createInstallments() {
      this.toggleInstallments(!this.popupInstallmentsVisible);
    },
    handleInstallments(value) {
      this.createInstallments(value);
    },
    handleItemType(value) {
      this.createEditItemType(value);
    },
    async saveCC(payload) {
      let close = true;
      let message = "Card created successfully";
      let icon = "success";
      try {
        await ccService.save(payload);
      } catch (e) {
        close = false;
        icon = "error";
        message = e.response?.data?.message ?? "Internal Server Error";
      } finally {
        Toast.fire({
          icon,
          text: message,
        });
        if (close) {
          await this.$store.dispatch("planning/getCards");
          this.handleCC(close);
        }
      }
    },
  },
  watch: {
    year(value) {
      this.$store.dispatch("planning/changePlanningYear", value);
    },
  },
  computed: {
    ...mapGetters({
      planning: "planning/planningGetter",
    }),
  },
};
