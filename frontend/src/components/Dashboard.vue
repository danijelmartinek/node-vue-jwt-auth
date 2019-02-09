<template>
  <div>
    <h1>Dashboard - user data</h1>   
    <p>
      {{$store.state.user}}
    </p>   
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  mounted(){
    this.$store.commit('authUser')
  }
}
