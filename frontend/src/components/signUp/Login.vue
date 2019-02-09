<template>
  <div class="login-register">
    <div class="loginErrors">
      <div v-for="(err, i) in login.errors" :key="i">
        {{ err }}
      </div>
      {{login.status}}
    </div>
    <div class="login">
      <span>Login: </span>
      <input v-model="login.email" type="text" placeholder="Email">
      <input v-model="login.password" type="password" placeholder="Password">
      <button v-on:click="loginHandler">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'login',
  data() {
    return {
      login: {
        email: null,
        password: null,
        errors: [],
        status: null
      },
    };
  },
  methods:{

    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },

    loginValidate() {
      
      this.login.errors = []

      if(!this.login.email) {
        this.login.errors.push("Email required.")
      } else if(!this.validateEmail(this.login.email)) {
        this.login.errors.push("Email must be in format example@domain.com")
      }
      if(!this.login.password) this.login.errors.push("Password required.")

      if(!(this.login.errors && this.login.errors.length)){
        return true
      } else{
        return false
      }
      
    },

    loginHandler() {

      let valid = this.loginValidate()

      const loginUserData = {
        email: this.login.email,
        password: this.login.password,
      }

      if(valid) {
        axios.post("/api/login", loginUserData)
        .then(res => {
          if (res.data.success == true) {
            this.$store.commit('authUser')

            this.$router.push({
              name: "Dashboard"
            });
          } else {
            this.login.status = res.data.message
          }
        })
      }
    }
  }
}
</script>
