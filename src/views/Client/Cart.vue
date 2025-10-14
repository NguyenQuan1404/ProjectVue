<template>
  <div class="container py-5">
    <h2 class="mb-4 text-primary">
      <i class="bi bi-cart-check-fill me-2"></i>Giỏ hàng của bạn
    </h2>

    <!-- 🛒 Bảng giỏ hàng -->
    <table class="table table-bordered align-middle text-center shadow-sm" v-if="cart.length">
      <thead class="table-primary">
        <tr>
          <th>Ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Tổng</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td><img :src="item.img" width="70" class="rounded shadow-sm" /></td>
          <td>{{ item.name }}</td>
          <td>{{ formatPrice(item.price) }} ₫</td>
          <td>
            <input
              type="number"
              min="1"
              v-model.number="item.quantity"
              @change="updateQuantity(item.id, item.quantity)"
              class="form-control form-control-sm text-center mx-auto"
              style="width: 80px"
            />
          </td>
          <td>{{ formatPrice(item.price * item.quantity) }} ₫</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="remove(item.id)">
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="alert alert-info mt-4 text-center">
      <i class="bi bi-info-circle me-2"></i>Giỏ hàng trống.
    </div>

    <!-- Tổng tiền -->
    <div v-if="cart.length" class="text-end mt-3">
      <h5 class="fw-bold text-success">
        Tổng cộng: <span class="text-danger">{{ formatPrice(totalAmount) }} ₫</span>
      </h5>
      <button class="btn btn-outline-danger mt-2" @click="clear">
        <i class="bi bi-x-circle me-1"></i>Xóa tất cả
      </button>
    </div>

    <!-- 🧾 Form Checkout -->
    <div v-if="cart.length" class="checkout-form mt-5 p-4 bg-light rounded-4 shadow-sm">
      <h4 class="text-primary mb-3">
        <i class="bi bi-credit-card-2-back me-2"></i>Thông tin thanh toán
      </h4>

      <form @submit.prevent="checkout">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Họ và tên</label>
            <input type="text" v-model="checkoutForm.name" class="form-control" required />
          </div>

          <div class="col-md-6">
            <label class="form-label">Email</label>
            <input type="email" v-model="checkoutForm.email" class="form-control" required />
          </div>

          <div class="col-md-6">
            <label class="form-label">Số điện thoại</label>
            <input type="text" v-model="checkoutForm.phone" class="form-control" required />
          </div>

          <div class="col-md-6">
            <label class="form-label">Địa chỉ giao hàng</label>
            <input type="text" v-model="checkoutForm.address" class="form-control" required />
          </div>
        </div>

        <div class="text-end mt-4">
          <button type="submit" class="btn btn-gradient px-4 py-2 rounded-pill">
            <i class="bi bi-bag-check-fill me-2"></i>Xác nhận thanh toán
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();
const API_URL = "http://localhost:3000/bill"; // đổi URL theo server JSON của bạn

// 🧩 Người dùng hiện tại
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userId = currentUser?.id;

// 🛒 Lấy giỏ hàng theo user
const cart = computed(() => store.getters.getCartByUser(userId) || []);

// 💰 Tổng tiền
const totalAmount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// 🧮 Hàm cập nhật số lượng
const updateQuantity = (id, qty) => {
  store.commit("UPDATE_QUANTITY", { userId, productId: id, quantity: qty });
};

// 🗑 Xóa sản phẩm
const remove = (id) => {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    store.commit("REMOVE_FROM_CART", { userId, productId: id });
  }
};

// 💣 Xóa toàn bộ giỏ hàng
const clear = () => {
  if (confirm("Xóa toàn bộ giỏ hàng?")) {
    store.commit("CLEAR_CART", userId);
  }
};

// 🧾 Form checkout
const checkoutForm = reactive({
  name: "",
  email: "",
  phone: "",
  address: "",
});

// 💳 Thanh toán
const checkout = async () => {
  if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.address) {
    alert("Vui lòng điền đầy đủ thông tin thanh toán!");
    return;
  }

  const newBill = {
    iduser: userId,
    name: checkoutForm.name,
    address: checkoutForm.address,
    phone: checkoutForm.phone,
    email: checkoutForm.email,
    total: totalAmount.value,
    status: "Chờ xác nhận", // ✅ Trạng thái mặc định
    createdAt: new Date().toISOString(),
  };

  try {
    await axios.post(API_URL, newBill);
    alert(`✅ Đơn hàng đã được tạo thành công!`);
    store.commit("CLEAR_CART", userId);
    Object.assign(checkoutForm, { name: "", email: "", phone: "", address: "" });
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    alert("❌ Lỗi khi tạo đơn hàng!");
  }
};

// 🧮 Format giá
const formatPrice = (price) => price.toLocaleString("vi-VN");
</script>

<style scoped>
.btn-gradient {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  transition: 0.3s;
}
.btn-gradient:hover {
  opacity: 0.9;
  transform: scale(1.05);
}
.checkout-form input {
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}
</style>
