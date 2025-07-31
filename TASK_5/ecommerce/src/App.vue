<!-- filepath: App.vue -->
<template>
  <div id="app">
    <WomanSection :products="womenProducts"/>
  </div>
</template>

<script>
import WomanSection from './components/SectionWoman.vue'

export default {
  name: 'App',
  components: {
    WomanSection
  },
  data() {
    return {
      products: []
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(
        product =>
          product.category === "men's clothing" ||
          product.category === "women's clothing"
      );
    },
    menProducts() {
      return this.products.filter(
        product => product.category === "men's clothing"
      );
    },
    womenProducts() {
      return this.products.filter(
        product => product.category === "women's clothing"
      );
    }
  },
  created() {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        this.products = data;
        console.log('Filtered Products:', this.filteredProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }
}
</script>

<style scoped>
</style>