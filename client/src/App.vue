<template>
  <div id="app">
        <Navbar v-if="isLogin"></Navbar>
        <router-view/>
  </div>
</template>
<script>
import Navbar from './views/Navbar.vue'
export default {
    name: "App",
    components: {
        Navbar
    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
        isLogin () {
            return this.$store.state.isLogin
        }
    },
    created () {
        // localStorage.setItem('token', 'tetets')
        if (localStorage.token) {
            this.$store.commit('SIGNIN', true)
            this.$router.push('/dashboard')
            // this.$store.dispatch('checkToken', localStorage.token)
        }
        else {
            this.$store.commit('SIGNIN', false)
            this.$router.push('/')
        }
    }
}
</script>
<style scoped>

</style>
