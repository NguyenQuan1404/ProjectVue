<template>
  <div class="container py-5" v-if="product">
    <!-- ========== Chi tiết sản phẩm ========== -->
    <div class="row g-4 align-items-center mb-5">
      <div class="col-md-5">
        <img
          :src="product.img"
          class="img-fluid rounded shadow-sm"
          :alt="product.name"
        />
      </div>
      <div class="col-md-7">
        <h2 class="fw-bold mb-3">{{ product.name }}</h2>
        <p class="text-muted mb-2">
          <i class="bi bi-tag-fill text-secondary me-2"></i>{{ product.category }}
        </p>
        <h4 class="text-danger fw-semibold mb-3">
          {{ formatVND(product.price) }}
        </h4>

        <button @click="addToCart" class="btn btn-primary me-2">
          <i class="bi bi-cart-plus"></i> Thêm vào giỏ
        </button>
        <button class="btn btn-outline-secondary" @click="router.back()">
          <i class="bi bi-arrow-left"></i> Quay lại
        </button>
      </div>
    </div>

    <!-- ========== Sản phẩm liên quan ========== -->
    <div v-if="relatedProducts.length" class="mt-5">
      <h4 class="fw-bold mb-4 border-bottom pb-2">Sản phẩm liên quan</h4>
      <div class="row g-4">
        <div
          v-for="item in relatedProducts"
          :key="item.id"
          class="col-6 col-md-3"
        >
          <div
            class="card h-100 shadow-sm border-0 hover-scale"
            @click="goToDetail(item.id)"
            style="cursor: pointer;"
          >
            <img
              :src="item.img"
              class="card-img-top"
              :alt="item.name"
              style="height: 200px; object-fit: cover;"
            />
            <div class="card-body text-center">
              <h6 class="card-title text-truncate">{{ item.name }}</h6>
              <p class="text-danger fw-semibold mb-0">
                {{ formatVND(item.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center mt-5 text-muted">
      <i class="bi bi-exclamation-circle"></i> Không có sản phẩm liên quan.
    </div>
  </div>

  <div v-else class="text-center py-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-3">Đang tải sản phẩm...</p>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore()
const route = useRoute();
const router = useRouter();

const product = ref(null);
const relatedProducts = ref([]);

const getProductById = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/Products/${route.params.id}`);
    product.value = res.data;
    getRelatedProducts(res.data.category, res.data.id);
  } catch (error) {
    console.error("Lỗi tải chi tiết:", error);
  }
};

// Lấy danh sách sản phẩm liên quan
const getRelatedProducts = async (category, currentId) => {
  try {
    const res = await axios.get("http://localhost:3000/Products");
    relatedProducts.value = res.data.filter(
      (item) => item.category === category && item.id !== currentId
    );
  } catch (error) {
    console.error("Lỗi tải sản phẩm liên quan:", error);
  }
};

const goToDetail = (id) => {
  router.push(`/product/${id}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
  getProductById(); // load lại dữ liệu
};

const addToCart = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser?.id;

  if (!userId) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
    return;
  }

  store.commit("ADD_TO_CART", { userId, product: product.value });
  alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
  router.push("/cart"); // nếu bạn muốn tự động điều hướng
};


const formatVND = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

onMounted(() => {
  getProductById();
});
</script>

<style scoped>
.hover-scale {
  transition: all 0.3s ease;
}
.hover-scale:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}
</style>
