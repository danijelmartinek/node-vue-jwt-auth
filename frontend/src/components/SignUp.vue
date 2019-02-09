<template>
  <div class="login-register">
    <register></register>
    <hr>
    <login></login>
  </div>
</template>

<script>
import register from "@/components/signUp/Register.vue";
import login from "@/components/signUp/Login.vue";

export default {
  name: 'SignUpPage',
  components: {
    register,
    login
  }
}
</script>
