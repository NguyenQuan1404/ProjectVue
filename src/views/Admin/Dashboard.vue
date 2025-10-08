<template>
  <div class="container-fluid py-4">
    <!-- 🔷 Tiêu đề -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold text-primary">
        <i class="bi bi-speedometer2 me-2"></i>Admin Dashboard
      </h3>
      <button class="btn btn-outline-primary btn-sm">
        <i class="bi bi-arrow-repeat me-1"></i>Làm mới
      </button>
    </div>

    <!-- 📊 Thống kê -->
    <div class="row g-4 mb-4">
      <div class="col-md-3" v-for="(item, index) in stats" :key="index">
        <div class="card stat-card border-0 shadow-sm rounded-4 text-center py-3 h-100">
          <div class="icon-wrapper mx-auto mb-2">
            <i :class="item.icon" class="fs-1 text-primary"></i>
          </div>
          <h6 class="text-muted mb-1">{{ item.title }}</h6>
          <h4 class="fw-bold">{{ item.value }}</h4>
        </div>
      </div>
    </div>

    <!-- 🧾 Bảng dữ liệu -->
    <div class="card shadow-sm border-0 rounded-4">
      <div class="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-semibold">
          <i class="bi bi-receipt-cutoff me-2"></i>Đơn hàng mới nhất
        </h5>
        <button class="btn btn-light btn-sm">
          <i class="bi bi-download me-1"></i>Xuất Excel
        </button>
      </div>

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light text-center">
              <tr>
                <th>#</th>
                <th>Khách hàng</th>
                <th>Sản phẩm</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                v-for="(order, index) in orders"
                :key="index"
                class="hover-row"
              >
                <td>{{ index + 1 }}</td>
                <td class="fw-semibold text-dark">{{ order.customer }}</td>
                <td>{{ order.product }}</td>
                <td class="fw-bold text-success">${{ order.amount }}</td>
                <td>
                  <span
                    class="badge px-3 py-2 rounded-pill"
                    :class="order.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'"
                  >
                    {{ order.status }}
                  </span>
                </td>
              </tr>
              <tr v-if="orders.length === 0">
                <td colspan="5" class="text-muted py-4">
                  <i class="bi bi-inbox me-2"></i>Không có đơn hàng nào
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const stats = ref([
  { title: "Total Users", value: 120, icon: "bi bi-people-fill" },
  { title: "Orders", value: 85, icon: "bi bi-cart-fill" },
  { title: "Revenue", value: "$12,430", icon: "bi bi-currency-dollar" },
  { title: "Products", value: 58, icon: "bi bi-box-seam" },
]);

const orders = ref([
  { customer: "John Doe", product: "Wine A", amount: 120, status: "Completed" },
  { customer: "Jane Smith", product: "Whiskey B", amount: 250, status: "Pending" },
  { customer: "Alice Brown", product: "Vodka C", amount: 90, status: "Completed" },
]);
</script>

<style scoped>
.stat-card {
  transition: all 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
.icon-wrapper {
  width: 60px;
  height: 60px;
  background: #e9f3ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hover-row:hover {
  background-color: #f9fafc;
  transition: 0.2s;
}
.card-header {
  border-bottom: none;
}
</style>
