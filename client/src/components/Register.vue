<template>
      <div>
        <b-container style="display:flex; justify-content: center; width: 100%; height: 100vh; align-items: center; flex-direction: column;">    
            <div style="display: flex; min-width: 25%; align-items:center; justify-content: center; margin-bottom: 30px; align-items: center;">
                <img src="../assets/payment-method.png" style="width: 50px; height: 50px; margin-right: 20px;">
                <h5 style="margin: 0;">7WONDER</h5>
            </div>
            <b-form style="display: flex; flex-direction: column; min-width: 25%; padding: 0; margin-bottom: 10px;"
                @submit.prevent="signUp"
            >
                <b-form-group label="Username:" label-for="username-input">
                    <b-form-input
                        id="username-input"
                        v-model="form.username"
                        type="text"
                        required
                        placeholder="Enter username">
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Email address:" label-for="email-input">
                    <b-form-input
                        id="email-input"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Enter email">
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Password" label-for="password-input">
                    <b-form-input
                        id="password-input"
                        v-model="form.password"
                        type="password"
                        required
                        :state="password"
                        aria-describedby="password-requirement"
                        placeholder="Enter password">
                    </b-form-input>
                    <b-form-invalid-feedback :state="password">
                        Your password at least have 6 characters
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-button variant="outline-secondary" type="submit">Register</b-button>
            </b-form>
            <div style="display: flex; flex-direction: column; width: 25%; padding: 0; margin-bottom: 10px;">
                <b-button variant="outline-secondary" @click.prevent="back">Back</b-button>
            </div>
        </b-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        back() {
            this.$emit('goToLoginPage')
        },
        signUp() {
            this.$store.dispatch('userRegister', this.form)
        }
    },
    computed: {
        password: function () {
            return this.form.password.length >= 6
        }
    }
}
</script>

<style>

</style>