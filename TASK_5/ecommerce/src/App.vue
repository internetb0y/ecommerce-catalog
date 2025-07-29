<!-- filepath: App.vue -->
<template>
  <div id="app">
    <ManSection :products="menProducts"/>
    <WomanSection :products="womenProducts"/>
    <UnavailableProduct />
  </div>
</template>

<script>
import ManSection from './components/SectionMan.vue'
import WomanSection from './components/SectionWoman.vue'
import UnavailableProduct from './components/UnavailableProduct.vue'

export default {
  name: 'App',
  components: {
    ManSection,
    WomanSection,
    UnavailableProduct
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>