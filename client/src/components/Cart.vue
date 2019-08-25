<template>
    <b-table-simple responsive small hover style="margin-top: 30px;">
        <b-thead head-variant="light">
            <b-tr>
                <b-th class="tableRow">No</b-th>
                <b-th class="tableRow">Item</b-th>
                <b-th class="tableRow">Quantity</b-th>
                <b-th class="tableRow">Total Price</b-th>
                <b-th class="tableRow">Pay</b-th>
                <b-th class="tableRow">Remove</b-th>
            </b-tr>
        </b-thead>
        <b-tbody>
            <b-tr v-for="(cart,i) in userCart" :key="cart._id">
                <b-th class="tableRow">{{ i+1 }}</b-th>
                <b-th class="tableRow">{{ cart.name }}</b-th>
                <b-th class="tableRow">{{ cart.quantity }}</b-th>
                <b-th class="tableRow">{{ price(cart.price*cart.quantity) }}</b-th>
                <b-th class="tableRow"><b-link class="button">Check Out</b-link></b-th>
                <b-th class="tableRow"><b-link class="trash" @click.prevent="removeCart(cart.cartId)"><i class="fas fa-trash"></i></b-link></b-th>
            </b-tr>
        </b-tbody>
        <b-tfoot>
            <b-tr variant="warning">
                <b-th colspan="3">Total Payment</b-th>
                <b-th class="tableRow">{{ price(totalPayment) }}</b-th>
                <b-th class="tableRow"><b-link class="button">Pay All</b-link></b-th>
                <b-th></b-th>
            </b-tr>
        </b-tfoot>
    </b-table-simple>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            totalPayment: 0
        }
    },
    methods: {
        removeCart(cartId) {
            Swal.fire({
                title: 'Delete this Item ?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete',
            })
            .then(result => {
                if (result.value) {
                    this.$store.dispatch('removeCart', cartId)
                }
            })
            .catch(err => {
                console.log(err)
            })
            
        }
    },
    computed: {
        ...mapState(['userCart']),
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
        this.totalPayment = this.userCart.reduce((accumulator,currentValue) => {
            return accumulator + currentValue.price * currentValue.quantity
        }, 0)
    }
}
</script>

<style scoped>
.tableRow {
    text-align: center;
}
.button {
    color: #087526;
}
.trash {
    color: red;
}
</style>