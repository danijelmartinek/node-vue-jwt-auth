<template>
  <div class="login-register">
    <div class="registerErrors">
      <div v-for="(err, i) in register.errors" :key="i">
        {{ err }}
      </div>
      {{register.status}}
    </div>
    <hr>
    <div class="register">
      <span>Register: </span>
      <input v-model="register.email" type="text" placeholder="Email">
      <input v-model="register.password" type="password" placeholder="Password">
      <input v-model="register.confirmPassword" type="password" placeholder="Confirm password">
      <input v-model="register.firstName" type="text" placeholder="First name">
      <input v-model="register.lastName" type="text" placeholder="Last name">
      <button v-on:click="registerHandler">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'register',
  data() {
    return {
      register: {
        email: null,
        password: null,
        confirmPassword: null,
        firstName: null,
        lastName: null,
        errors: [],
        status: null
      }
    };
  },
  mounted() {
    this.$store.commit('getEmails');
  },
  methods: {

    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },

    registerValidate() {
      
      this.register.errors = []

      if(!this.register.email) {
        this.register.errors.push("Email required.")
      } else if(!this.validateEmail(this.register.email)) {
        this.register.errors.push("Email must be in format example@domain.com")
      }  else if(this.$store.state.userEmails.includes(this.register.email)) {
        this.register.errors.push("Email is not allowed. Please choose another one.")
      }

      if(!this.register.password) this.register.errors.push("Password required.")
      if(!this.register.confirmPassword) {
        this.register.errors.push("Confirm Password required.")
      } else if(this.register.password != this.register.confirmPassword) {
        this.register.errors.push("Passwords must match")
      }
      if(!this.register.firstName) this.register.errors.push("First name required.")
      if(!this.register.lastName) this.register.errors.push("Last name required.")

      if(!(this.register.errors && this.register.errors.length)){
        return true
      } else{
        return false
      }
      
    },

    registerHandler() {

      let valid = this.registerValidate();

      const registerUserData = {
        email: this.register.email,
        password: this.register.password,
        firstName: this.register.firstName,
        lastName: this.register.lastName
      }

      if(valid) {
        axios.post("/api/register", registerUserData)
        .then(res => {
          if (res.data.success == true) {
            this.$store.commit('authUser')

            this.$router.push({
              name: "Dashboard"
            })
          } else {
            this.register.status = res.data.message
          }
        })
      }
    }
  }
}
</script>
