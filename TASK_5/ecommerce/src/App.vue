<!-- filepath: App.vue -->
<template>
  <div id="app">
    <ManSection />
    <WomanSection />
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