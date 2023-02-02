import Visa from "../../assets/visa.svg";
import Master from "../../assets/master.svg";
import Elo from "../../assets/elo.svg";
import Default from "../../assets/logo.png";
import { getMatchedByCardNumber } from "@/helpers/regexMatcher";
import mask from './mask.vue'
import RawPopup from "../popup/RawPopup.vue";
import {popupVisibility} from "@/mixins/popup";
import Input from '../input/Input.vue'

const CC_BRAND_ICONS = {
  visa: Visa,
  elo: Elo,
  mastercard: Master,
  no_matches: Default,
};

 const CC_COLORS  = {
	no_matches: ['#202024', '#121214'],
	visa: ['#436D99', '#2D57F2'],
	mastercard: ['#C69347', '#DF6F29'],
	elo: ['#FFCB05', '#EF4123']
}
export default {
  mixins: [popupVisibility],
  components: {
    mask,
    RawPopup,
    Input
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
      },
    };
  },
  computed: {
    ccIcon() {
      const match = getMatchedByCardNumber(this.card.number?.replace(/\s/g, ''));
      console.log(CC_BRAND_ICONS[match])
      return CC_BRAND_ICONS[match];
    },
    ccColor() {
      const match = getMatchedByCardNumber(this.card.number?.replace(/\s/g, ''));
      console.log(match)
      return CC_COLORS[match]
    },
    ccBrand() {
      return getMatchedByCardNumber(this.card.number?.replace(/\s/g, ''))
    },
    save() {
      this.$emit("save", this.card)
    }
  },
};
