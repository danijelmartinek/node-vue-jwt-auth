<template>
  <div>
    <h1>Home - user logout</h1>   
    <p>
      {{$store.state.user}}
    </p>   
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted(){
    this.$store.commit('logoutUser')
  }
}
</script>
