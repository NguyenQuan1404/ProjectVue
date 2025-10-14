<template>
  <div class="container py-5">
    <h2 class="fw-bold text-gradient mb-4">
      <i class="bi bi-receipt-cutoff me-2"></i>Quản lý đơn hàng
    </h2>

    <!-- Bảng đơn hàng -->
    <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
      <div class="card-body p-0">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-primary text-center">
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Tổng tiền</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in bill" :key="item.id" class="text-center">
              <td class="fw-bold text-primary">#{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.address }}</td>
              <td>{{ item.phone }}</td>
              <td class="fw-semibold text-success">{{ formatPrice(item.total) }} ₫</td>
              <td>{{ formatDate(item.date) }}</td>
              <td>
                <!-- 🔹 Select trạng thái -->
                <select
                  v-model="item.status"
                  @change="updateStatus(item)"
                  class="form-select form-select-sm fw-semibold text-center"
                  :class="statusClass(item.status)"
                  style="min-width: 150px;"
                >
                  <option>Chờ xác nhận</option>
                  <option>Đã xác nhận</option>
                  <option>Đang giao hàng</option>
                  <option>Đã hoàn thành</option>
                </select>
              </td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-2">
                  <i class="bi bi-eye-fill"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteOrder(item.id)">
                  <i class="bi bi-trash3-fill"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Khi chưa có đơn -->
    <div v-if="bill.length === 0" class="text-center mt-4 alert alert-info">
      <i class="bi bi-info-circle me-2"></i>Hiện chưa có đơn hàng nào.
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const bill = ref([]);

// 🔹 Lấy danh sách bill
const getbill = async () => {
  try {
    const res = await axios.get("http://localhost:3000/bill");
    bill.value = res.data;
  } catch (error) {
    console.error("Lỗi tải bill:", error);
    alert("Không thể tải bill. Kiểm tra server JSON!");
  }
};

// 🔹 Cập nhật trạng thái
const updateStatus = async (item) => {
  try {
    await axios.put(`http://localhost:3000/bill/${item.id}`, item);
    alert(`✅ Đơn #${item.id} đã cập nhật trạng thái: ${item.status}`);
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
    alert("Không thể cập nhật trạng thái đơn hàng!");
  }
};

// 🔹 Xóa đơn hàng
const deleteOrder = async (id) => {
  if (confirm("Bạn có chắc muốn xóa đơn hàng này không?")) {
    try {
      await axios.delete(`http://localhost:3000/bill/${id}`);
      bill.value = bill.value.filter((b) => b.id !== id);
      alert("🗑️ Đơn hàng đã được xóa!");
    } catch (error) {
      console.error("Lỗi xóa đơn hàng:", error);
    }
  }
};

// 🔹 Format tiền
const formatPrice = (price) => Number(price).toLocaleString("vi-VN");

// 🔹 Format ngày
const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// 🔹 Màu trạng thái
const statusClass = (status) => {
  switch (status) {
    case "Chờ xác nhận":
      return "bg-warning text-dark";
    case "Đã xác nhận":
      return "bg-info text-white";
    case "Đang giao hàng":
      return "bg-primary text-white";
    case "Đã hoàn thành":
      return "bg-success text-white";
    default:
      return "bg-secondary text-white";
  }
};

onMounted(() => {
  getbill();
});
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.table th {
  font-weight: 600;
}

.table td {
  vertical-align: middle;
}

select.form-select {
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}
select.form-select:hover {
  transform: scale(1.05);
}

.btn-outline-primary:hover,
.btn-outline-danger:hover {
  transform: scale(1.1);
  transition: all 0.2s ease;
}
</style>
