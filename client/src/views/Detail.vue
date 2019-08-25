<template>
<b-container style="display:flex; justify-content: center; margin-top: 100px;">
    <b-card :img-src="product.image" :img-alt="product.name" img-left style="max-width: 100%; min-width: 70%;">
      <b-card-text style="font-size: 15px;">
        {{ product.details }}
      </b-card-text>
      <b-card-text>
          Stock: {{ product.stock }} 
      </b-card-text>
      <b-card-text>
          Price: {{ product.price }}
      </b-card-text>
      <div style="display:flex; width: 100%;">
        <b-form-input type="number" min="0.00" size="sm" v-model="value" style="width: 20%; heigth: 100%; margin-right: 30px;"></b-form-input>
        <b-button variant="dark" @click.prevent="addToCart(product._id)" :disabled="product.stock == 0">Add To Cart</b-button>
      </div>
    </b-card>
</b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            value: '1'
        }
    },
    methods: {
        addToCart(id) {
            this.$store.dispatch('addToCart', {
                id,
                quantity: Number(this.value)
            })
        }
    },
    computed: {
        ...mapState(['product'])
    },
    created() {
        this.$store.dispatch('findOneProduct', this.$route.params.id)
    }
}
</script>

<style>

</style>