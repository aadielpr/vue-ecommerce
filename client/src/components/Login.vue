<template>
    <div>
        <b-container style="display:flex; justify-content: center; width: 100%; height: 100vh; align-items: center; flex-direction: column;">    
            <div style="display: flex; min-width: 25%; align-items:center; justify-content: center; margin-bottom: 30px; align-items: center;">
                <img src="../assets/payment-method.png" style="width: 50px; height: 50px; margin-right: 20px;">
                <h5 style="margin: 0;">7WONDER</h5>
            </div>
            <b-form style="display: flex; flex-direction: column; min-width: 25%; padding: 0; margin-bottom: 10px;"
                @submit.prevent="signIn"
            >
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
                <b-button variant="outline-secondary" type="submit">Login</b-button>
            </b-form>
            <div style="display: flex; min-width: 25%; margin-bottom: 20px; justify-content: space-around; color: #969592;">
                <span>Don't have an account ?</span><a href="#" @click.prevent="signUp" style="text-decoration: underline;">Register here</a>
            </div>
            <div>
              <b-button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</b-button>
            </div>
        </b-container>
    </div>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'
export default {
    directives:{
        GoogleSignInButton
    },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      clientId: '552587421887-16nnsk6qohvfi0psso6l7cma0s329scb.apps.googleusercontent.com'
    }
  },
  methods: {
    signIn() {
      this.$store.dispatch('userSignIn', this.form)
    },
    signUp() {
      this.$emit('goToSignUpPage');
    },
    OnGoogleAuthSuccess (idToken) {
        this.$store.dispatch('signInGoogle',idToken)
    },
    OnGoogleAuthFail (error) {
        console.log(error)
    }
  },
  computed: {
    password: function () {
      return this.form.password.length >= 6
    }
  }
}
</script>

<style scoped>

</style>