<template>
  <b-navbar toggleable="lg" type="light" variant="white" style="border-bottom: 2px solid #f5f5f7;">
    <b-navbar-brand>Jajanin Aja</b-navbar-brand>
      <b-navbar-nav tabs fill style="display:flex; width:40%;">
        <b-nav-item>Dashboard</b-nav-item>
        <b-nav-item>Your Cart</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-button variant="light" @click.prevent="signOut">Logout</b-button>
      </b-navbar-nav>
  </b-navbar>
</template>
Navbar
<script>
export default {
  methods: {
    signOut () {
      this.$store.dispatch('userSignOut', "masuk")
    }
  }
}
</script>

<style scoped>

</style>