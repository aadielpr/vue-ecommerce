<template>
    <div>
        <Loginform v-if="!isRegister" @signIn="signIn" @goToSignUpPage="goToSignUpPage"></Loginform>
        <RegisterForm v-if="isRegister" @goToLoginPage="goToLoginPage" @signUp="signUp"></RegisterForm>
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
            isRegister: false
        }
    },
    methods: {
        signIn(signInForm) {
            this.$router.push({name: "about", params: {id: 5}});
        },
        signUp(signUpForm) {
            this.isRegister = false
        },
        goToSignUpPage() {
            this.isRegister = true;
        },
        goToLoginPage() {
            this.isRegister = false;
        }
    }
}
</script>

<style>

</style>