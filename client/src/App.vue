<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import Landingpage from '@/views/Landingpage.vue'
import Dashboard from '@/views/Dashboard.vue'
export default {
    components: {
        Landingpage,
        Dashboard
    }
}
</script>
<style>

</style>
