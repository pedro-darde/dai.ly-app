import { useCurrencyInput } from "vue-currency-input";
import quickid from "@/helpers/quickid";
import { watch, defineEmits } from "vue";
export default {
  name: "CurrencyInput",
  props: {
    modelValue: Number, // Vue 2: value
    options: Object,
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      default: quickid(),
    },
    placeholder: {
      type: String,
      default: "",
    },
    extraProps: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const { inputRef, setValue, formattedValue, numberValue } =
      useCurrencyInput({
        locale: "pt-BR",
        currency: "BRL",
        currencyDisplay: "hidden",
        precision: 2,
        hideCurrencySymbolOnFocus: true,
        hideGroupingSeparatorOnFocus: false,
        hideNegligibleDecimalDigitsOnFocus: false,
        autoDecimalDigits: true,
        useGrouping: true,
        accountingSign: false,
      });

    watch(
      () => +props.modelValue,
      (value) => {
        setValue(value);
      }
    );

    watch(numberValue, (value) => {
      emit("update:modelValue", value);
      emit("input", value);
    });

    return { inputRef, formattedValue };
  },
};
