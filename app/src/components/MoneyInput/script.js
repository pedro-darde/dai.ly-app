import { useCurrencyInput } from 'vue-currency-input'
import quickid from '@/helpers/quickid'
export default {
    name: 'CurrencyInput',
    props: {
        value: Number, // Vue 2: value
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
    },
    setup(props) {
        const { inputRef } = useCurrencyInput({
            "locale": "pt-BR",
            "currency": "BRL",
            "currencyDisplay": "hidden",
            "precision": 2,
            "hideCurrencySymbolOnFocus": true,
            "hideGroupingSeparatorOnFocus": false,
            "hideNegligibleDecimalDigitsOnFocus": false,
            "autoDecimalDigits": true,
            "useGrouping": true,
            "accountingSign": false
        })

        return { inputRef }
    }
}