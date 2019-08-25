import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import Swal from 'sweetalert2'
const user_url = "http://localhost:3000/user/"
const product_url = "http://localhost:3000/product/"
const cart_url = "http://localhost:3000/cart/"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,
        isRegister: false,
        products: [],
        product: {},
        userCart: [],
        userProfile: {}
    },
    mutations: {
        SIGNIN(state, payload) {
            state.isLogin = payload;
        },
        GOTOREGISTERPAGE(state, payload) {
            state.isRegister = payload;
        },
        FILLPRODUCT(state, payload) {
            state.products = payload;
        },
        ONEPRODUCT(state, payload) {
            state.product = payload;
        },
        FILLUSERPROFILE(state, payload) {
            state.userCart = payload.userCart;
            state.userProfile = payload.userProfile
        }
    },
    actions: {
        userSignIn ({ commit }, payload) {
            axios({
                method: 'post',
                url: `${user_url}signIn`,
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('junk', response.data.id)
                Swal.fire({
                    type: 'success',
                    title: 'Register success !',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    commit('SIGNIN', true)
                    router.push('/dashboard')
                }, 1700)
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Register fail !',
                    text: `${err.response.data}`,
                    showConfirmButton: true
                })
            })
        },
        userRegister({ commit }, payload) {
            axios({
                method: 'post',
                url: `${user_url}`,
                data: {
                    username: payload.username,
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(response => {
                Swal.fire({
                    type: 'success',
                    title: 'Register success !',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    commit('GOTOREGISTERPAGE', false)
                },1700)
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Register fail !',
                    text: `${err.response.data}`,
                    showConfirmButton: true
                })
            })
        },
        userSignOut ({ commit }, payload) {
            Swal.fire({
                type: 'success',
                title: 'Logout success !',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                localStorage.clear()
                commit('SIGNIN', false)
                router.push('/')
            }, 1700)
        },
        checkToken({ commit }, payload) {
            axios({
                method: 'post',
                url: `${user_url}checkToken`,
                headers: {
                    token: payload
                }
            })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchProduct({ commit }) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'get',
                url: `${product_url}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(response => {
                setTimeout(() => {
                    Swal.close()
                }, 1000)
                setTimeout(() => {
                    commit('FILLPRODUCT', response.data)
                }, 1100)
            })
            .catch(err => {
                console.log(err)
            })
        },
        findOneProduct({ commit }, payload) {
            axios({
                method: 'get',
                url: `${product_url}${payload}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(response => {
                commit('ONEPRODUCT', response.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        addToCart({ commit }, payload) {
            axios({
                method: 'post',
                url: `${cart_url}addToCart`,
                data: {
                    productId: payload.id,
                    quantity: payload.quantity
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(response => {
                Swal.fire({
                    type: 'success',
                    title: 'Item add to your cart',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        findUserCart({ commit }, payload) {
            axios({
                method: 'get',
                url: `${cart_url}findUserCart`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(response => {
                const userProfile = response.data[0].user;
                const userCart = response.data.map((el) => { return {
                    cartId: el._id,
                    quantity: el.quantity,
                    status: el.status,
                    ...el.product
                }})
                commit('FILLUSERPROFILE', {
                    userProfile,
                    userCart
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeCart({ commit, dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'delete',
                url: `${cart_url}deleteCart/${payload}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(response => {
                Swal.close()
                Swal.fire({
                    type: 'success',
                    title: 'Delete success !',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    dispatch('findUserCart')
                }, 1700)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})