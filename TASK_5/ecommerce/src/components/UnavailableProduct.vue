<template>
  <div class="section-bg">
    <div class="product-card">
      <div v-if="products && products.length" class="card-content">
        <img src="../assets/img/sad-face.png" alt="Unavailable Product Image" />
        <div class="card-detail">
          <p>This product is unavailable to show</p>
          <button class="next-btn" @click="nextProduct">Next product</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnavailableProduct',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 3
    };
  },
  computed: {
    currentProduct() {
      return this.products[this.currentIndex] || {};
    }
  },
  methods: {
    nextProduct() {
      if (this.products && this.products.length > 0) {
        if (this.currentIndex === this.products.length - 1) {
          this.currentIndex = this.products.length - 1;
          this.$emit('next-category');
        } else {
          this.currentIndex++;
        }
        console.log(this.products.length);
      }
    }
  }
};
</script>

<style scoped>
.section-bg {
  /* Layout */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Box Model */
  width: auto;
  height: 65vh;
  margin: -8px;
  padding: 0;

  /* Background */
  background-color: #DCDCDC;
}

.product-card {
  /* Layout */
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  /* Box Model */
  max-width: 1034px;
  min-width: 1034px;
  max-height: 580px;
  min-height: 580px;
  padding: 30px 42px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);

  /* Typography */
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 400;
  font-style: regular;
  line-height: 100%;
  color: #000000;

  /* Background */
  background-color: #ffffff;

  /* Visual */
  transform: translate(-50%, -50%);
}

.card-content {
  /* Layout */
  display: flex;
  flex-direction: row;
  align-items: center;

  /* Box Model */
  max-width: 1034px;
  min-width: 1034px;
  max-height: 580px;
  min-height: 580px;
}

.card-content img {
  /* Layout */
  position: absolute;
  top: 50%;
  left: 55%;
  z-index: 2;

  /* Visual */
  transform: translate(-50%, -50%);
}

.card-detail {
  /* Layout */
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;

  /* Box Model */
  max-width: 500px;
  min-width: 500px;

  /* Visual */
  transform: translate(-50%, -50%);
}

.card-detail p {
  /* Layout */
  display: flex;
  justify-content: center;;
  
  /* Box Model */
  width: 100%;
  margin: 10px 0;
}

.next-btn {
  /* Layout */
  position: relative;

  /* Box Model */
  width: 100%;
  padding: 10px 64px;
  border: 3px solid #1e1e1e;
  border-radius: 6px;

  /* Typograhpy */
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #1e1e1e;

  /* Background */
  background: #fff;

  /* Visual */
  cursor: pointer;
  transition: 0.3s;
}

.next-btn:hover {
  /* Box Model */
  padding: 10px 64px;
  border: 3px solid #1e1e1e;
  border-radius: 6px;

  /* Typograhpy */
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #fff;

  /* Background */
  background: #1e1e1e;
}
</style>