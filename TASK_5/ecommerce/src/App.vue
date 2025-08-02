<template>
  <div id="app">
    <div v-if="products.length > 0">
      <AllSection 
        :products="filteredProducts"
      />
    </div>
    <div v-else class="loading-message">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import AllSection from './components/AllSection.vue'

export default {
  name: 'App',
  components: {
    AllSection
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