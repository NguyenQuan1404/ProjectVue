<script setup>
import { ref, onMounted } from "vue";

const user = ref(null);

onMounted(() => {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) user.value = JSON.parse(savedUser);
});

const handleLogout = () => {
  localStorage.removeItem("currentUser");
  user.value = null;
  window.location.href = "/";
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3 sticky-top">
    <div class="container">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand d-flex align-items-center gap-2 fw-bold text-primary">
        <i class="bi bi-bag-check-fill fs-4 text-gradient"></i>
        <span class="fs-4 brand-text">Sturdy Works</span>
      </router-link>

      <!-- Toggle -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu -->
      <div class="collapse navbar-collapse" id="navMenu">
        <!-- Left -->
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active-link">
              <i class="bi bi-house-door me-1"></i>Trang chủ
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/product" class="nav-link" active-class="active-link">
              <i class="bi bi-grid me-1"></i>Sản phẩm
            </router-link>
          </li>
        </ul>

        <!-- Right -->
        <ul class="navbar-nav ms-auto align-items-center">
          <!-- Nếu chưa đăng nhập -->
          <li v-if="!user" class="nav-item">
            <router-link to="/login" class="btn btn-outline-primary me-2 px-3 py-1 rounded-pill">
              Đăng nhập
            </router-link>
          </li>
          <li v-if="!user" class="nav-item">
            <router-link to="/sign" class="btn btn-primary px-3 py-1 rounded-pill">
              Đăng ký
            </router-link>
          </li>

          <!-- Nếu đã đăng nhập -->
          <li v-else class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button"
              data-bs-toggle="dropdown">
              <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                class="rounded-circle border border-primary me-2" width="36" height="36" />
              <span class="fw-semibold text-dark">{{ user.username }}</span>
            </a>

            <!-- Dropdown menu -->
            <ul class="dropdown-menu dropdown-menu-end shadow-sm rounded-3 mt-2">
              <li>
                <router-link to="/profile" class="dropdown-item">
                  <i class="bi bi-person-circle me-2"></i> Hồ sơ
                </router-link>
              </li>

              <!-- 🔹 Chỉ hiện nếu role là 'user' -->
              <li v-if="user.role === 'user'">
                <router-link to="/order-history" class="dropdown-item">
                  <i class="bi bi-clock-history me-2"></i> Lịch sử đơn hàng
                </router-link>
              </li>

              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <button class="dropdown-item text-danger" @click="handleLogout">
                  <i class="bi bi-box-arrow-right me-2"></i> Đăng xuất
                </button>
              </li>
            </ul>

          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Gradient Text */
.text-gradient {
  background: linear-gradient(45deg, #0d6efd, #6610f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Navbar Styling */
.navbar {
  font-size: 15px;
  font-weight: 500;
  border-radius: 0 0 20px 20px;
  backdrop-filter: blur(10px);
}

/* Brand */
.brand-text {
  background: linear-gradient(45deg, #0d6efd, #6610f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Nav link animation */
.nav-link {
  color: #555;
  position: relative;
  transition: all 0.25s ease;
  padding: 6px 12px;
  border-radius: 10px;
}

.nav-link:hover {
  color: #0d6efd;
  background: rgba(13, 110, 253, 0.1);
  transform: translateY(-2px);
}

.active-link {
  background: linear-gradient(to right, #0d6efd, #6610f2);
  color: white !important;
  border-radius: 10px;
}

/* Dropdown */
.dropdown-menu {
  border: none;
  padding: 0.5rem;
  min-width: 200px;
}

.dropdown-item {
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.dropdown-item i {
  font-size: 1rem;
}

.dropdown-item:hover {
  background: linear-gradient(to right, #0d6efd, #6610f2);
  color: #fff;
}

/* Avatar hover effect */
.nav-link img {
  transition: all 0.3s ease;
}

.nav-link img:hover {
  transform: scale(1.1);
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.2);
}
</style>
