export default {
    methods: {
        spentOnDebitMonth(month) {
            return month.items.reduce((acc, item) => {
                if (item.operation === "out" && item.paymentMethod === "debit") acc += item.value
                return acc
            }, 0)
        },
        spentOnCreditMonth(month) {
          return month.items.reduce((acc, item) => {
              if (item.operation === "out" && item.paymentMethod === "credit") acc += item.value
              return acc
            }, 0)
        },
        in(month) {
            return month.items.reduce((acc, item) => {
                if (item.operation === "in") acc += item.value
                return acc
            }, 0)
        },
        out(month) {
            return month.items.reduce((acc, item) => {
                if (item.operation === "out") acc += item.value
                return acc
            }, 0)
        },
        monthBalance(month) {
            return month.items.reduce((accPlanning, item) => {
                if (item.operation === "in") {
                  accPlanning += item.value;
                } else {
                  accPlanning -= item.value;
                }
                return accPlanning;
              }, 0)
        }
    }
}