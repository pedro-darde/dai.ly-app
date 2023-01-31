export default {
    props: {
        details: {
            required: true,
            type: Array
        }
    },

    computed: {
        totalIn() {
            return this.details.filter(item => item.operation === 'in').reduce((acc, item) => acc += item.value, 0)
        },
        totalOut() {
            return this.details.filter(item => item.operation === 'out').reduce((acc, item) => acc += item.value, 0)
        },
        balance() {
            return this.totalIn - this.totalOut
        }
    }
}