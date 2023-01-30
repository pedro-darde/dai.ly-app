export default {
    props: {
        details: {
            required: true,
            type: Array
        }
    },
    computed: {
        inDetails() {
            return this.details.filter(item => item.operation === 'in')
        },
        outDetails() {
            return this.details.filter(item => item.operation === 'out')
        },
    }
}