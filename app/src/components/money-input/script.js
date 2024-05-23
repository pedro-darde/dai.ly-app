import { useCurrencyInput } from 'vue-currency-input'
import quickid from '@/helpers/quickid'
import { watch, defineEmits } from 'vue'
export default {
    name: 'CurrencyInput',
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
    },
    setup(props, { emit}) {
        const { inputRef, setValue, formattedValue, numberValue } = useCurrencyInput({
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

        console.log("estou no setup")


        watch(
            () => +props.modelValue, 
            (value) => {
                console.log("recebi valor da model")
              setValue(value)
            }
          )

        watch(
            numberValue,
            (value) => {
                console.log("o valor esta mudando")
                emit('update:modelValue', value)
                emit('input', value)
            }
        )

        return { inputRef, formattedValue }
    }
}