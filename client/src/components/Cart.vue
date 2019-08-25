<template>
    <b-table-simple responsive small hover style="margin-top: 30px;">
        <b-thead head-variant="light">
            <b-tr>
                <b-th class="tableRow">No</b-th>
                <b-th class="tableRow">Item</b-th>
                <b-th class="tableRow">Quantity</b-th>
                <b-th class="tableRow">Total Price</b-th>
                <b-th class="tableRow">Remove</b-th>
            </b-tr>
        </b-thead>
        <b-tbody>
            <b-tr v-for="(cart,i) in userCart" :key="cart._id">
                <b-th class="tableRow">{{ i+1 }}</b-th>
                <b-th class="tableRow">{{ cart.name }}</b-th>
                <b-th class="tableRow">{{ cart.quantity }}</b-th>
                <b-th class="tableRow">{{ price(cart.price*cart.quantity) }}</b-th>
                <b-th class="tableRow"><b-link class="trash" @click.prevent="removeCart(cart.cartId)"><i class="fas fa-trash"></i></b-link></b-th>
            </b-tr>
        </b-tbody>
        <b-tfoot v-if="userCart.length !== 0">
            <b-tr variant="warning">
                <b-th colspan="3">Total Payment</b-th>
                <b-th class="tableRow">{{ price(totalPayment) }}</b-th>
                <b-th class="tableRow"><b-link class="button" v-b-modal="'modal-pay'">Pay All</b-link></b-th>
                <b-th></b-th>
            </b-tr>
        </b-tfoot>
            <b-modal id="modal-pay">
                <b-form @submit.prevent="checkOut()" id="formCheckOut">
                <b-form-group label="Address: " label-for="address">
                    <b-form-input type="text" v-model="form.address" placeholder="Enter address" id="address" required></b-form-input>
                </b-form-group>
                <b-form-group label="Phone Number: " label-for="phone">
                    <b-form-input type="text" v-model="form.phoneNumber" placeholder="Enter phone number" id="phone"></b-form-input>
                </b-form-group>
                <b-form-group label="Zipcode: " label-for="zipcode">
                    <b-form-input type="text" v-model="form.zipCode" id="zipcode" placeholder="Enter zipcode" ></b-form-input>
                </b-form-group>
                </b-form>
                <div slot="modal-footer">
                <b-button variant="primary" type="submit" form="formCheckOut">Update</b-button>
                </div>
            </b-modal>
    </b-table-simple>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            totalPayment: 0,
            form: {
                address: '',
                phoneNumber: '',
                zipCode: ''
            }
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
        },
        checkOut() {
            Swal.fire({
                title: `Pay All Item ?`,
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#087526',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Buy',
            })
            .then(result => {
                if (result.value) {
                    this.$bvModal.hide('modal-pay')
                    this.$store.dispatch('checkOut', {
                        userId: this.userProfile._id,
                        address: this.form.address,
                        zipCode: this.form.zipCode,
                        phoneNumber: this.form.phoneNumber,
                    })
                    this.form.address = '';
                    this.form.zipCode = '';
                    this.form.phoneNumber = '';
                }
            })
            .catch(err => {
                console.log(err)
            }) 
        }
    },
    computed: {
        ...mapState(['userCart', 'userProfile']),
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
    updated() {
        this.totalPayment = this.userCart.reduce((accumulator,currentValue) => {
            return accumulator + currentValue.price * currentValue.quantity
        }, 0)
    },
    created() {
        this.$store.dispatch('findUserCart')
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