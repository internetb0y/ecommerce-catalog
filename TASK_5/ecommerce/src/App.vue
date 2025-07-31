<template>
  <div id="app">
    <div v-if="products.length > 0">
      <ManSection
        v-if="currentCategory === 'men'"
        :products="menProducts"
        @next-category="switchCategory"
      />
      <WomanSection
        v-else-if="currentCategory === 'women'"
        :products="womenProducts"
        @next-category="switchCategory"
      />
      <UnavailableProduct
        v-else
        :products="menProducts"
        @next-category="switchCategory"
      />
    </div>
    <div v-else class="loading-message">
      <div class="spinner"></div>
    </div>
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
      products: [],
      currentCategory: 'unavailable'
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
  flex-direction: column;
}

.spinner {
  width: 90px;
  height: 90px;
  border: 6px solid #eee;
  border-top: 6px solid #555;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>