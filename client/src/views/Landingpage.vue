<template>
    <div>
        <Loginform v-if="!isRegister" @goToSignUpPage="goToSignUpPage"></Loginform>
        <RegisterForm v-if="isRegister" @goToLoginPage="goToLoginPage"></RegisterForm>
    </div>
</template>

<script>
import Loginform from '@/components/Login.vue'
import RegisterForm from '@/components/Register.vue'
export default {
    name: "landing_page",
    components: {
        Loginform,
        RegisterForm
    },
    data() {
        return {

        }
    },
    methods: {
        goToSignUpPage() {
            this.$store.commit('GOTOREGISTERPAGE', true)
        },
        goToLoginPage() {
            this.$store.commit('GOTOREGISTERPAGE', false)
        }
    },
    computed: {
        isRegister () {
            return this.$store.state.isRegister
        }
    }
}
</script>

<style>

</style>