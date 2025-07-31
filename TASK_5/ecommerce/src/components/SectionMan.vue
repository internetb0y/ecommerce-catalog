<template>
    <div class="section-bg">
      <div class="product-card">
        <div v-if="products && products.length" class="card-content">
          <div class="card-image">
            <img :src="currentProduct.image" alt="Man Product Image" />
          </div>
          <div class="card-detail">
            <div class="card-title">
              <h2>{{ currentProduct.title }}</h2>
              <div class="card-info">
                <span class="category">{{ currentProduct.category }}</span>
                <span class="rating">
                  <span class="rate">{{ currentProduct.rating.rate }}/5</span>
                  <span class="circles">
                    <span v-for="i in 5" :key="i" :class="['circle', i <= Math.round(currentProduct.rating.rate) ? 'filled' : '']"></span>
                  </span>
                </span>
              </div>
            </div>
            <div class="card-desc">
              <p>{{ currentProduct.description }}</p>
            </div>
            <div class="card-bottom">
              <div class="card-price">
                <span>${{ currentProduct.price }}</span>
              </div>
              <div class="card-btns">
                <button class="buy-btn">Buy now</button>
                <button class="next-btn" @click="nextProduct">Next product</button>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="no-products">No men's products available.</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ManSection',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0
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
          this.currentIndex = 0;
          this.$emit('next-category');
        } else {
          this.currentIndex++;
        }
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
  background-color: #D6E6FF;
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

.card-image {
  /* Layout */
  display: flex;
  justify-content: space-between;

  /* Box Model */
  width: auto;
  height: auto;
  margin-right: 15px;
}

.card-image img {
  /* Layout */
  display: flex;

  /* Box Model */
  width: 305.81px;
  height: 407px;
  
  /* Visual */
  object-fit: contain;
}

.card-detail {
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;

  /* Box Model */
  min-width: 350px;
}

.card-title h2 {
  /* Box Model */
  margin: 0 0 5px 0;

  /* Typography */
  font-family: "Inter", sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #002772;
}

.card-info {
  /* Layout */
  display: flex;
  justify-content: space-between;

  /* Box Model */
  padding: 5px 0;
  border-bottom: 1px solid #00000033;

  /* Typography */
  font-family: "Inter", sans-serif;
}

.category {
  /* Typography */
  font-size: 18px;
  font-weight: 400;
  line-height: 100%;
  color: #3f3f3f;
}

.rating {
  /* Layout */
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.rate {
  /* Typography */
  font-size: 18px;
  font-weight: 400;
  color: #3f3f3f;
}

.circles {
  /* Layout */
  display: flex;
  gap: 2px;
}

.circle {
  /* Layout */
  display: inline-block;

  /* Box Model */
  width: 18px;
  height: 18px;
  border: 1px solid #002772;
  border-radius: 50%;

  /* Background */
  background: #ffffff;
}

.circle.filled {
  /* Box Model */
  border: 1px solid #002772;

  /* Background */
  background: #002772;
}

.card-desc {
  /* Layout */
  display: flex;

  /* Box Model */
  height: 100%;

  /* Typography */
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.3;
  color: #1e1e1e;
}

.card-buttom {
  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-price {
  /* Box Model */
  padding: 10px 0;
  border-top: 1px solid #00000033;

  /* Typography */
  font-family: "Inter", sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #002772;
}

.card-btns {
  /* Layout */
  display: flex;
  gap: 16px;
}

.buy-btn {
  /* Box Model */
  padding: 10px 72px;
  border: 3px solid #002772;
  border-radius: 6px;

  /* Typograhpy */
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #fff;

  /* Background */
  background: #002772;

  /* Visual */
  cursor: pointer;
  transition: 0.3s;
}

.buy-btn:hover {
  /* Box Model */
  padding: 10px 72px;
  border: 3px solid #002772;
  border-radius: 6px;

  /* Typograhpy */
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #002772;

  /* Background */
  background: #fff;
}

.next-btn {
  /* Box Model */
  padding: 10px 64px;
  border: 3px solid #002772;
  border-radius: 6px;

  /* Typograhpy */
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #002772;

  /* Background */
  background: #fff;

  /* Visual */
  cursor: pointer;
  transition: 0.3s;
}

.next-btn:hover {
  /* Box Model */
  padding: 10px 64px;
  border: 3px solid #002772;
  border-radius: 6px;

  /* Typograhpy */
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #fff;

  /* Background */
  background: #002772;
}

.no-products {
  /* Box Model */
  margin: 32px 0;

  /* Typography */
  font-size: 1.1rem;
  text-align: center;
  color: #1a2a4f;
}
</style>
