<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const categories = ref([])

const loadData = async () => {
  try {
    const response = await axios.get("http://localhost/ProjectVue/api/getCategory")
    if (response.status === 200) {
      categories.value = response.data.data || []
    }
  } catch (error) {
    console.error("Lỗi load category:", error)
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="container my-5">
    <!-- Banner -->
    <div class="row g-4 mb-5 align-items-stretch">
      <!-- Carousel -->
      <div class="col-lg-8 col-md-12">
        <div id="mainBanner" class="carousel slide rounded-4 overflow-hidden shadow-lg" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://media.istockphoto.com/id/1311273895/vi/anh/c%C3%A1c-lo%E1%BA%A1i-%C4%91%E1%BB%93-d%C3%B9ng-h%E1%BB%8Dc-t%E1%BA%ADp-tr%C3%AAn-b%C3%A0n.jpg?s=612x612&w=0&k=20&c=vLc_bYr2UVIz6Tw-yaB1VRJ6hRKyaUAHXNrEcedB0VU="
                class="d-block w-100 object-cover" alt="Banner 1" />
            </div>
            <div class="carousel-item">
              <img
                src="https://sentiaschool.edu.vn/wp-content/uploads/2025/04/do-dung-hoc-tap-thumb.jpg.webp"
                class="d-block w-100 object-cover" alt="Banner 2" />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#mainBanner" data-bs-slide="prev">
            <span class="carousel-control-prev-icon bg-dark rounded-circle p-2"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#mainBanner" data-bs-slide="next">
            <span class="carousel-control-next-icon bg-dark rounded-circle p-2"></span>
          </button>
        </div>
      </div>

      <!-- Banner phụ -->
      <div class="col-lg-4 col-md-12 d-flex flex-column gap-4">
        <div class="small-banner flex-fill rounded-4 overflow-hidden shadow-sm">
          <img
            src="https://tiki.vn/blog/wp-content/uploads/2023/10/do-dung-hoc-tap.jpg"
            class="w-100 h-100 object-cover" alt="Small Banner 1" />
        </div>
        <div class="small-banner flex-fill rounded-4 overflow-hidden shadow-sm">
          <img
            src="https://img.pikbest.com/wp/202342/school-supplies-background-back-to-3d-rendered_9862815.jpg!w700wp"
            class="w-100 h-100 object-cover" alt="Small Banner 2" />
        </div>
      </div>
    </div>

    <!-- Danh mục -->
    <div class="text-center mb-5">
      <h2 class="fw-bold text-gradient mb-3">
        <i class="bi bi-collection me-2"></i>Khám phá danh mục
      </h2>
      <p class="text-muted">Chọn ngay thể loại bạn yêu thích để khám phá thêm nhiều sản phẩm hấp dẫn.</p>
    </div>

    <!-- Lưới danh mục -->
    <div class="row g-4">
      <div class="col-6 col-sm-4 col-md-3 col-lg-2" v-for="cat in categories" :key="cat.id">
        <div class="card category-item border-0 text-center shadow-sm p-3 rounded-4">
          <div class="img-wrapper mx-auto mb-3">
            <img
              :src="`http://localhost/ProjectVue/public/uploads/category/${cat.img}`"
              class="rounded-circle border border-3 border-light shadow-sm" alt="Category" />
          </div>
          <h6 class="fw-semibold mb-0">{{ cat.name }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* === Banner === */
.object-cover {
  object-fit: cover;
  height: 100%;
}
.small-banner img {
  transition: transform 0.4s ease;
}
.small-banner img:hover {
  transform: scale(1.05);
}

/* === Tiêu đề === */
.text-gradient {
  background: linear-gradient(90deg, #6f42c1, #0d6efd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* === Danh mục === */
.category-item {
  background: #fff;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}
.category-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}
.category-item .img-wrapper {
  width: 90px;
  height: 90px;
}
.category-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 4px;
  background: #fff;
}

/* === Responsive === */
@media (max-width: 768px) {
  .category-item .img-wrapper {
    width: 70px;
    height: 70px;
  }
}
</style>
