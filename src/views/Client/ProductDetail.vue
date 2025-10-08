
<template>
  <div class="container py-5" v-if="product">
    <div class="row g-4 align-items-center">
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

        <button class="btn btn-primary me-2">
          <i class="bi bi-cart-plus"></i> Thêm vào giỏ
        </button>
         <button class="btn btn-outline-secondary" @click="router.back()">
    <i class="bi bi-arrow-left"></i> Quay lại
  </button>
      </div>
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
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const route = useRoute();
const product = ref(null);

const router = useRouter();

const getProductById = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/Products/${route.params.id}`
    );
    product.value = res.data;
  } catch (error) {
    console.error("Lỗi tải chi tiết:", error);
  }
};

onMounted(() => {
  getProductById();
});

const formatVND = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n
  );
</script>
