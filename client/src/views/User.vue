<template>
    <b-container fluid style="margin-top: 40px; display:flex; align-content:center; height: 100vh; flex-direction: column; align-items: center;">
        <h5 style="color: #30302f">Hello {{ username }}</h5>
        <div style="display: flex; justify-content: space-around; width: 25%; border-top: 2px solid #424140 ;">
            <b-link :to="'/user/transaction'" style="color: #807e7a;">Transaction</b-link>
            <b-link :to="'/user/cart'" style="color: #807e7a;">Cart</b-link>
        </div>
        <div style="display: flex; width: 80%; justify-content: center; height: 100%;">
            <router-view></router-view>
        </div>
    </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            username: localStorage.username
        }
    },
    mounted() {
        this.$store.dispatch('findUserCart')
        this.$store.dispatch('findUserTransaction')
    },
    computed: {
        ...mapState(['userCart', 'userProfile'])
    }
}
</script>

<style>

</style>