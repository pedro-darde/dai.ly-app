import { getMatchedByCardNumber } from "@/helpers/regexMatcher";
import mask from './mask.vue'
import RawPopup from "../popup/RawPopup.vue";
import {popupVisibility} from "@/mixins/popup";
import Input from '../input/Input.vue'
import Details from "./Details.vue";
import Preview from './card-preview.vue'


export default {
  mixins: [popupVisibility],
  components: {
    mask,
    RawPopup,
    Input,
    Details,
    Preview
  },
  data() {
    return {
      card: {
        cardName: "",
        ownerName: "",
        number: "",
        flag: "",
        validateDate: "",
        creditLimit: 0,
        type: "debit&credit",
        cvv: ""
      },
      tabs: [
        {
          name: "Create Card",
          value: 0
        },
        {
          name: "My Cards",
          value: 1
        }
      ],
      activeTab: 0
    };
  },
  methods: {
    handleChangeTab({ value }) {
        this.activeTab = value
    },
    save() {
      this.card.flag = getMatchedByCardNumber(this.card.number?.replace(/\s/g, ''))
      this.$emit("save", this.card)
    }
  },
  
};
