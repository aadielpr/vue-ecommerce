<template>
    <b-table-simple responsive small hover style="margin-top: 30px;">
        <b-thead head-variant="light">
            <b-tr>
                <b-th class="tableRow">No</b-th>
                <b-th class="tableRow">Name</b-th>
                <b-th class="tableRow">Total Price</b-th>
                <b-th class="tableRow">Purchased</b-th>
                <b-th class="tableRow">Quantity</b-th>
            </b-tr>
        </b-thead>
        <b-tbody>
            <b-tr v-for="(transaction,i) in userTransaction" :key="transaction._id">
                <b-th class="tableRow">{{ i+1 }}</b-th>
                <b-th class="tableRow">{{ transaction.name }}</b-th>
                <b-th class="tableRow">{{ price(transaction.totalPrice) }}</b-th>
                <b-th class="tableRow">{{ moment(`${transaction.purchase}`).format('DD-MM-YYYY, h:mm:ss a') }}</b-th>
                <b-th class="tableRow">{{ transaction.quantity }}</b-th>
            </b-tr>
        </b-tbody>
    </b-table-simple>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            moment
        } 
    },
    computed: {
        ...mapState(['userTransaction']),
        price() {
            return (value) => {
                let valueStr = String(value).split('').reverse().join('')
                let newValue = '';
                for(let i = 0; i < valueStr.length; i++) {
                    newValue += valueStr[i];
                    if ((i+1) % 3 == 0 && i != valueStr.length - 1) {
                        newValue += '.'
                    }
                }
                newValue = newValue.split('').reverse().join('')
                return `Rp. ${newValue}`
            } 
        }
    },
    created() {
        this.$store.dispatch('findUserTransaction')
    }
}
</script>

<style scoped>
.tableRow {
    text-align: center;
}
</style>