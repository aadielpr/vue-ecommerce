<template>
<div>
    <b-container>
        <b-row style="margin-top: 30px;">
            <Card v-for="product in products" :key="product._id" :products="product"></Card>
        </b-row>
    </b-container>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card.vue'
export default {
    name: 'Dashboard',
    components: {
      Card
    },
    data() {
        return {
            
        }
    },
    created() {
        this.$store.dispatch('fetchProduct')
    },
    computed: {
        ...mapState(['products'])
    }
}
</script>
