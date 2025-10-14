<template>
  <div class="container py-5">
    <h2 class="fw-bold text-gradient mb-4">
      <i class="bi bi-clock-history me-2"></i> Lịch sử đơn hàng của bạn
    </h2>

    <!-- Nếu có đơn hàng -->
    <div v-if="userOrders.length > 0" class="card shadow-lg border-0 rounded-4 overflow-hidden">
      <div class="card-body p-0">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-primary text-center">
            <tr>
              <th>Mã đơn</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in userOrders" :key="item.id" class="text-center">
              <td class="fw-bold text-primary">#{{ item.id }}</td>
              {{ formatDate(item.date) }}
              <td class="fw-semibold text-success">{{ formatPrice(item.total) }} ₫</td>
              <td>
                <span
                  class="badge px-3 py-2 rounded-pill"
                  :class="statusClass(item.status)"
                >
                  <i :class="statusIcon(item.status)" class="me-1"></i>
                  {{ item.status }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-outline-primary">
                  <i class="bi bi-eye-fill me-1"></i> Xem
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Nếu chưa có đơn -->
    <div v-else class="alert alert-info text-center mt-4 py-4">
      <i class="bi bi-emoji-frown me-2 fs-4"></i>
      Bạn chưa có đơn hàng nào.
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const bill = ref([]);
const userOrders = ref([]);
const currentUser = ref(null);

const getBills = async () => {
  try {
    const res = await axios.get("http://localhost:3000/bill");
    bill.value = res.data;
    // Lọc đơn hàng theo iduser trùng user hiện tại
    userOrders.value = bill.value.filter(
      (item) => item.iduser === currentUser.value?.id
    );
  } catch (error) {
    console.error("Lỗi tải bill:", error);
  }
};

// Định dạng tiền
const formatPrice = (price) => Number(price).toLocaleString("vi-VN");

// Định dạng ngày
const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Class trạng thái
const statusClass = (status) => {
  switch (status) {
    case "Chờ xác nhận":
      return "bg-warning text-dark";
    case "Đã xác nhận":
      return "bg-info text-white";
    case "Đang giao hàng":
      return "bg-primary text-white";
    case "Đã hoàn thành":
      return "bg-success";
    case "Đã hủy":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};

// Icon trạng thái
const statusIcon = (status) => {
  switch (status) {
    case "Chờ xác nhận":
      return "bi bi-hourglass-split";
    case "Đã xác nhận":
      return "bi bi-check-circle";
    case "Đang giao hàng":
      return "bi bi-truck";
    case "Đã hoàn thành":
      return "bi bi-check-circle-fill";
    case "Đã hủy":
      return "bi bi-x-circle-fill";
    default:
      return "bi bi-question-circle";
  }
};

onMounted(() => {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) currentUser.value = JSON.parse(savedUser);
  getBills();
});
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card {
  overflow-x: auto;
  border-radius: 15px;
}

.table th {
  font-weight: 600;
}

.badge {
  font-size: 0.9rem;
}

.btn-outline-primary:hover {
  transform: scale(1.1);
  transition: all 0.2s ease;
}

.alert-info {
  background: #eaf3ff;
  color: #0d6efd;
  border: none;
  border-radius: 12px;
}
</style>
