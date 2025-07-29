<template>
    <div>
      <ul v-if="products && products.length">
        <li v-for="product in products" :key="product.id">
          <h2>{{ product.title }}</h2>
          <p>{{ product.category }}</p>
          <p>{{ product.description }}</p>
          <p>Price: ${{ product.price }}</p>
          <p>{{ product.rating.rate }} {{ product.rating.count }}</p>
          <img :src="product.image" alt="Product Image" />
        </li>
      </ul>
      <p v-else>No women's products available.</p>
    </div>
</template>

<script>
export default {
  name: 'WomanSection',
  props: {
    products: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
</style>