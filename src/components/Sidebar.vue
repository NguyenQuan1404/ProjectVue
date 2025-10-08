<script setup>
import { RouterLink } from "vue-router"
</script>

<template>
  <div id="sidebar-wrapper" class="sidebar-container">
    <!-- Header -->
    <div class="sidebar-heading text-center fw-bold text-gradient py-4">
      <i class="bi bi-speedometer2 me-2"></i> Admin Panel
    </div>

    <!-- Menu -->
    <div class="list-group list-group-flush px-2">
      <RouterLink
        to="/admin"
        class="menu-item list-group-item list-group-item-action d-flex align-items-center"
        exact-active-class="active"
      >
        <i class="bi bi-graph-up me-2 text-primary"></i> Dashboard
      </RouterLink>

      <RouterLink
        to="/admin/user"
        class="menu-item list-group-item list-group-item-action d-flex align-items-center"
        active-class="active"
      >
        <i class="bi bi-people-fill me-2 text-info"></i> Users
      </RouterLink>

      <RouterLink
        to="/admin/category"
        class="menu-item list-group-item list-group-item-action d-flex align-items-center"
        active-class="active"
      >
        <i class="bi bi-folder-fill me-2 text-warning"></i> Categories
      </RouterLink>

      <RouterLink
        to="/admin/product"
        class="menu-item list-group-item list-group-item-action d-flex align-items-center"
        active-class="active"
      >
        <i class="bi bi-box-seam-fill me-2 text-success"></i> Products
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* ==== Sidebar Container ==== */
.sidebar-container {
  width: 240px;
  min-height: 100vh;
  background: rgba(25, 25, 25, 0.85);
  backdrop-filter: blur(8px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.25);
  color: #fff;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

/* ==== Heading ==== */
.sidebar-heading {
  font-size: 1.3rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* ==== Menu Item ==== */
.menu-item {
  background: transparent;
  color: #e9ecef;
  border: none;
  border-radius: 10px;
  margin: 6px 0;
  padding: 10px 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.menu-item i {
  font-size: 1.2rem;
  width: 22px;
  text-align: center;
}

.menu-item:hover {
  background: linear-gradient(90deg, #0d6efd20, #6610f220);
  color: #fff;
  transform: translateX(4px);
}

/* ==== Active ==== */
.list-group-item.active {
  background: linear-gradient(90deg, #0d6efd, #6610f2);
  color: #fff !important;
  border: none;
  box-shadow: 0 0 15px rgba(13, 110, 253, 0.4);
  transform: translateX(4px);
}

/* ==== Gradient Text ==== */
.text-gradient {
  background: linear-gradient(90deg, #0d6efd, #6610f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ==== Responsive ==== */
@media (max-width: 992px) {
  .sidebar-container {
    width: 100%;
    min-height: auto;
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
  }

  .menu-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    margin: 4px;
  }
}
</style>
