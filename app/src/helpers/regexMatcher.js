const VISA_CARD_REGEX = /^4\d{12}(\d{3})?$/
const MASTER_CARD_REGEX = /^(5[1-5]\d{4}|677189)\d{10}$/
const ELO_CARD_REGEX = /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/



export const getMatchedByCardNumber = (cardNumber) => {
    if (cardNumber.match(VISA_CARD_REGEX)) return "visa";
    if (cardNumber.match(MASTER_CARD_REGEX)) return "mastercard";
    if (cardNumber.match(ELO_CARD_REGEX)) return "elo"
    return 'mastercard'
}