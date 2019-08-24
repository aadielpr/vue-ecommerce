<template>
    <b-col cols="4" >
        <b-card
          no-body
          style="max-width: 100%;; margin-bottom: 20px;"
          :img-src="products.image"
          :img-alt="products.name"
          img-height="200"
        >
            <b-card-body>
              <b-card-title>{{ products.name }}</b-card-title>
              <b-card-sub-title class="mb-2">{{ inRupiah }}</b-card-sub-title>
            </b-card-body>

            <b-card-body>
              <a href="#" @click.prevent="seeDetail(products._id)" class="card-link">See Details</a>
            </b-card-body>
        </b-card>
  </b-col>
</template>

<script>
export default {
    props: {
        products: Object
    },
    methods: {
        seeDetail(id) {
            this.$router.push(`/detail/${id}`)
        }
    },
    computed: {
        inRupiah() {
            let valueStr = String(this.products.price).split('').reverse().join('')
            let newValue = '';
            for(let i = 0; i < valueStr.length; i++) {
                newValue += valueStr[i];
                if ((i+1) % 3 == 0 && i != valueStr.length - 1) {
                    newValue += '.'
                }
            }
            newValue = newValue.split('').reverse().join('')
            return `Rp. ${newValue}`
        }
    }
}
</script>

<style>

</style>