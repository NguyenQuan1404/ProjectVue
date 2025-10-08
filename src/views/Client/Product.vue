<template>
  <div class="container-fluid py-4 bg-light">
    <div class="row">
      <!-- Sidebar -->
      <aside class="col-md-3 mb-4">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white border-0 d-flex align-items-center">
            <i class="bi bi-list-nested me-2 text-primary"></i>
            <h5 class="mb-0 fw-bold text-primary">Danh mục</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item list-group-item-action"
              v-for="cat in categories"
              :key="cat.id"
            >
              <i class="bi bi-tag me-2 text-secondary"></i>{{ cat.name }}
            </li>
          </ul>
        </div>
      </aside>

      <!-- Khu vực sản phẩm -->
      <main class="col-md-9">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="fw-bold mb-0">
            <i class="bi bi-bag-check-fill text-success me-2"></i>Sản phẩm
          </h4>
          <span class="badge bg-primary">Tổng: {{ Products.length }}</span>
        </div>

        <div class="row g-4">
          <div
            class="col-lg-4 col-md-6"
            v-for="item in Products"
            :key="item.id"
          >
            <router-link
              :to="`/product/${item.id}`"
              class="text-decoration-none text-dark"
            >
              <div class="card h-100 border-0 shadow-sm hover-card">
                <img
                  :src="item.img"
                  class="card-img-top"
                  :alt="item.name"
                  style="height: 220px; object-fit: cover;"
                />
                <div class="card-body text-center">
                  <h6 class="card-title fw-bold">{{ item.name }}</h6>
                  <p class="text-danger mb-1 fw-semibold">
                    {{ formatVND(item.price) }}
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const Products = ref([]);
const categories = ref([]);

const getProducts = async () => {
  try {
    const res = await axios.get("http://localhost:3000/Products");
    Products.value = res.data;
  } catch (error) {
    console.error("Lỗi tải sản phẩm:", error);
  }
};

const getCategories = async () => {
  try {
    const res = await axios.get("http://localhost:3000/categories");
    categories.value = res.data;
  } catch (error) {
    console.error("Lỗi tải danh mục:", error);
  }
};

onMounted(() => {
  getProducts();
  getCategories();
});

const formatVND = (n) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);
</script>

<style scoped>
.hover-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>
