<!-- filepath: App.vue -->
<template>
  <div id="app">
    <div v-if="products.length > 0">
      <ManSection
        v-if="currentCategory === 'men'"
        :products="menProducts"
        @next-category="switchCategory"
      />
      <WomanSection
        v-else
        :products="womenProducts"
        @next-category="switchCategory"
      />
    </div>
    <div v-else class="loading-message">
      <p>Loading products...</p>
    </div>
  </div>
</template>

<script>
import ManSection from './components/SectionMan.vue'
import WomanSection from './components/SectionWoman.vue'

export default {
  name: 'App',
  components: {
    ManSection,
    WomanSection
  },
  data() {
    return {
      products: [],
      currentCategory: 'men' 
    }
  },
  computed: {
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
  methods: {
    switchCategory() {
      this.currentCategory = this.currentCategory === 'men' ? 'women' : 'men';
      console.log(`Switched to ${this.currentCategory}'s products.`);
    }
  },
  created() {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        this.products = data;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }
}
</script>

<style scoped>
.loading-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #555;
}
</style>