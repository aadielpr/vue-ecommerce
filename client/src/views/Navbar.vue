<template>
  <b-navbar type="light" variant="light" style="border-bottom: 2px solid #f5f5f7; display:flex; justify-content: space-around;">
    <b-navbar-brand>7WONDER</b-navbar-brand>
      <b-navbar-nav tabs style="display:flex; width: 10%;">
        <b-nav-item @click.prevent="goToDashboard">Shop</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content"><i class="fas fa-cog"></i></template>
          <b-dropdown-item href="#" @click.prevent="userPage">Cart and Transaction</b-dropdown-item>
          <b-dropdown-item href="#" @click.prevent="signOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
  </b-navbar>
</template>
Navbar
<script>
export default {
  methods: {
    signOut () {
      this.$store.dispatch('userSignOut')
    },
    userPage() {
        this.$router.push('/user')
    },
    goToDashboard() {
        this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>

</style>