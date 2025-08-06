<template>
  <div id="app">
    <div v-if="products.length > 0">
      <!-- Menampilkan seluruh produk dari AllSection komponen -->
      <AllSection 
        :products="filteredProducts"
      />
    </div>
    <div v-else class="loading-message">
      <!-- Menampilkan pesan loading saat produk belum tersedia -->
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
  // Data untuk menyimpan produk yang diambil dari API
  data() {
    return {
      products: []
    }
  },
  computed: {
    // Mengambil produk yang hanya termasuk dalam kategori pakaian pria dan wanita
    filteredProducts() {
      return this.products.filter(
        product =>
          product.category === "men's clothing" ||
          product.category === "women's clothing"
      );
    }
  },
  // Mengambil data produk dari API saat komponen dibuat
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
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Box Model */
  height: 100vh;

  /* Typography */
  font-size: 1.5rem;
  color: #555;
}

/* Animasi untuk spinner loading */
.spinner {
  /* Box Model */
  width: 90px;
  height: 90px;
  margin-bottom: 16px;
  border: 6px solid #eee;
  border-top: 6px solid #555;
  border-radius: 50%;

  /* Visual */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>