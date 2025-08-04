<template>
  <div :class="sectionBgClass">
    <div class="product-card">
      <div v-if="isUnavailable" class="card-content-unavailable">
        <img src="../assets/img/sad-face.png" alt="Unavailable Product Image" />
        <div class="card-detail-unavailable">
          <p class="card-desc-unavailable">This product is unavailable to show</p>
          <button :class="nextBtnClass" @click="nextProduct" class="btn-next-unavailable">Next product</button>
        </div>
      </div>
      <div v-else-if="products && products.length" class="card-content">
        <div class="card-image">
          <img :src="currentProduct.image" :alt="altText" />
        </div>
        <div class="card-detail">
          <div :class="cardTitleClass">
            <h2>{{ currentProduct.title }}</h2>
            <div class="card-info">
              <span class="category">{{ currentProduct.category }}</span>
              <span class="rating">
                <span class="rate">{{ currentProduct.rating.rate }}/5</span>
                <span class="circles">
                  <span v-for="i in 5" :key="i" :class="circleClass(i)"></span>
                </span>
              </span>
            </div>
          </div>
          <div class="card-desc">
            <p>{{ currentProduct.description }}</p>
          </div>
          <div class="card-bottom">
            <div :class="cardPriceClass">
              <span>${{ currentProduct.price }}</span>
            </div>
            <div class="card-btns">
              <button :class="buyBtnClass">Buy now</button>
              <button :class="nextBtnClass" @click="nextProduct">Next product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllSection',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  // Berfungsi untuk mengatur indeks produk saat ini
  data() {
    return {
      currentIndex: 0
    };
  },
  computed: {
    // Mengambil produk saat ini berdasarkan indeks
    currentProduct() {
      return this.products[this.currentIndex] || {};
    },
    // Memeriksa apakah produk saat ini tidak tersedia
    isUnavailable() {
      if (!this.products || !this.products.length) return true;
      const cat = this.currentProduct.category || '';
      return !["men's clothing", "women's clothing"].includes(cat) || !this.currentProduct.rating;
    },
    // Mengatur kelas CSS untuk bagian latar belakang, judul, harga, tombol beli, dan tombol berikutnya
    sectionBgClass() {
      if (this.isUnavailable) return 'section-bg unavailable-bg';
      if (this.currentProduct.category === "men's clothing") return 'section-bg men-bg';
      if (this.currentProduct.category === "women's clothing") return 'section-bg women-bg';
      return 'section-bg';
    },
    // Mengatur kelas CSS untuk judul, harga, dan tombol berdasarkan kategori produk
    cardTitleClass() {
      if (this.currentProduct.category === "men's clothing") return 'card-title men-title';
      if (this.currentProduct.category === "women's clothing") return 'card-title women-title';
      return 'card-title';
    },
    // Mengatur kelas CSS untuk harga produk
    cardPriceClass() {
      if (this.currentProduct.category === "men's clothing") return 'card-price men-price';
      if (this.currentProduct.category === "women's clothing") return 'card-price women-price';
      return 'card-price';
    },
    // Mengatur kelas CSS untuk tombol beli dan tombol berikutnya berdasarkan kategori produk
    buyBtnClass() {
      if (this.currentProduct.category === "men's clothing") return 'buy-btn men-btn';
      if (this.currentProduct.category === "women's clothing") return 'buy-btn women-btn';
      return 'buy-btn';
    },
    // Mengatur kelas CSS untuk tombol berikutnya berdasarkan kategori produk dan ketersediaan
    nextBtnClass() {
      if (this.isUnavailable) return 'next-btn unavailable-btn';
      if (this.currentProduct.category === "men's clothing") return 'next-btn men-btn';
      if (this.currentProduct.category === "women's clothing") return 'next-btn women-btn';
      return 'next-btn';
    },
    // Mengatur teks alternatif untuk gambar produk berdasarkan kategori
    altText() {
      if (this.currentProduct.category === "men's clothing") return 'Man Product Image';
      if (this.currentProduct.category === "women's clothing") return 'Woman Product Image';
      return 'Product Image';
    }
  },
  methods: {
    // Berfungsi untuk beralih ke produk berikutnya
    nextProduct() {
      if (!this.products || this.products.length === 0) return;
      if (this.isUnavailable) {
        this.currentIndex = this.products.length - 1;
        this.$emit('next-category');
        return;
      }
      if (this.currentIndex === this.products.length - 1) {
        this.currentIndex = 0;
        this.$emit('next-category');
      } else {
        this.currentIndex++;
      }
    },
    // Mengatur kelas CSS untuk lingkaran rating berdasarkan kategori dan nilai rating
    circleClass(i) {
      let base = 'circle';
      if (this.currentProduct.category === "men's clothing") base += ' men-circle';
      if (this.currentProduct.category === "women's clothing") base += ' women-circle';
      if (i <= Math.round(this.currentProduct.rating?.rate || 0)) base += ' filled';
      return base;
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
.section-bg.men-bg { background-color: #D6E6FF; }
.section-bg.women-bg { background-color: #FDE2FF; }
.section-bg.unavailable-bg { background-color: #DCDCDC; }

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
.card-title.men-title h2 { color: #002772; }
.card-title.women-title h2 { color: #720060; }

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

.circle {
  /* Layout */
  display: inline-block;

  /* Box Model */
  width: 18px;
  height: 18px;
  border-radius: 50%;

  /* Background */
  background: #fff;
}
.circle.men-circle { border: 1px solid #002772; }
.circle.men-circle.filled { background: #002772; border: 1px solid #002772; }
.circle.women-circle { border: 1px solid #720060; }
.circle.women-circle.filled { background: #720060; border: 1px solid #720060; }
.circle.filled { background: #002772; border: 1px solid #002772; }

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

.card-price {
  /* Box Model */
  padding: 10px 0;
  border-top: 1px solid #00000033;

  /* Typography */
  font-family: "Inter", sans-serif;
  font-size: 28px;
  font-weight: 600;
}
.card-price.men-price { color: #002772; }
.card-price.women-price { color: #720060; }

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
  width: 50%;
  padding: 10px 72px;
  border-radius: 6px;

  /* Typograhpy */
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 600;

  /* Visual */
  cursor: pointer;
  transition: 0.3s;
}
.buy-btn.men-btn {
  border: 3px solid #002772;
  color: #fff;
  background: #002772;
}
.buy-btn.men-btn:hover {
  border: 3px solid #002772;
  color: #002772;
  background: #fff;
}
.buy-btn.women-btn {
  border: 3px solid #720060;
  color: #fff;
  background: #720060;
}
.buy-btn.women-btn:hover {
  border: 3px solid #720060;
  color: #720060;
  background: #fff;
}

.next-btn {
  /* Box Model */
  width: 50%;
  padding: 10px 72px;
  border-radius: 6px;

  /* Typograhpy */
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 600;

  /* Visual */
  cursor: pointer;
  transition: 0.3s;
}
.next-btn.men-btn {
  border: 3px solid #002772;
  color: #002772;
  background: #fff;
}
.next-btn.men-btn:hover {
  color: #fff;
  background: #002772;
}
.next-btn.women-btn {
  border: 3px solid #720060;
  color: #720060;
  background: #fff;
}
.next-btn.women-btn:hover {
  color: #fff;
  background: #720060;
}
.next-btn.unavailable-btn {
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
.next-btn.unavailable-btn:hover {
  background: #1e1e1e;
  color: #fff;
}

/* Unavailable Product Styles */

.card-content-unavailable {
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

.card-content-unavailable img {
  /* Layout */
  position: absolute;
  top: 50%;
  left: 55%;
  z-index: 2;

  /* Visual */
  transform: translate(-50%, -50%);
}

.card-detail-unavailable {
  /* Layout */
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;

  /* Box Model */
  max-width: 500px;
  min-width: 500px;

  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 400;
  font-style: regular;
  line-height: 100%;
  color: #000000;

  /* Visual */
  transform: translate(-50%, -50%);
}

.card-desc-unavailable {
  /* Layout */
  display: flex;
  justify-content: center;;
  
  /* Box Model */
  width: 100%;
  margin: 10px 0;
}

</style>