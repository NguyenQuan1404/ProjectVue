<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";

const idUser = JSON.parse(localStorage.getItem("currentUser"));
const id = idUser ? idUser.id : "";

// 🔹 Thông tin người dùng hiện tại
const user = reactive({
  id: "",
  username: "",
  email: "",
  image: "",
  age: "",
  sex: "",
  desiredproduct: "",
});

// 🔹 Trạng thái hiển thị form chỉnh sửa
const isEditing = ref(false);

// 🔹 Lấy thông tin người dùng từ server
const getUser = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/users/${id}`);
    Object.assign(user, res.data);
  } catch (error) {
    console.error("Lỗi tải Profile:", error);
    alert("Không thể tải Profile. Kiểm tra server JSON!");
  }
};

// 🔹 Bật form chỉnh sửa
const edit = () => {
  isEditing.value = true;
};

// 🔹 Lưu thay đổi
const saveEdit = async () => {
  try {
    await axios.put(`http://localhost:3000/users/${user.id}`, user);
    alert("Cập nhật thông tin thành công!");
    isEditing.value = false;
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    alert("Không thể cập nhật thông tin.");
  }
};

onMounted(() => {
  getUser();
});
</script>

<template>
  <div class="container py-5">
    <div class="card profile-card border-0 shadow-lg rounded-4 overflow-hidden">
      <div class="profile-header text-white text-center py-4">
        <h3 class="fw-bold mb-0">👤 Thông tin tài khoản</h3>
      </div>

      <div class="card-body bg-light p-5">
        <div class="row align-items-center g-5">
          <!-- Cột trái -->
          <div class="col-md-4 text-center">
            <img
              :src="user.image"
              alt="Ảnh đại diện"
              class="rounded-circle border border-4 border-white shadow-sm mb-3"
              width="200"
              height="200"
            />
            <h4 class="fw-bold mt-3 mb-1">{{ user.username }}</h4>
            <p class="text-secondary mb-0">
              <i class="bi bi-star-fill text-warning me-1"></i>Thành viên VIP
            </p>
          </div>

          <!-- Cột phải -->
          <div class="col-md-8">
            <h4 class="text-primary fw-bold mb-4">
              <i class="bi bi-person-vcard-fill me-2"></i>Thông tin cá nhân
            </h4>

            <div v-if="!isEditing">
              <div class="row g-4">
                <div class="col-sm-6" v-for="(label, key) in {
                    username: 'Tên người dùng',
                    email: 'Email',
                    age: 'Tuổi',
                    sex: 'Giới tính'
                  }" :key="key">
                  <div class="info-box p-3 bg-white rounded-3 shadow-sm d-flex align-items-center">
                    <i class="bi bi-person-circle fs-3 text-primary me-3" v-if="key === 'username'"></i>
                    <i class="bi bi-envelope-fill fs-3 text-danger me-3" v-if="key === 'email'"></i>
                    <i class="bi bi-calendar-heart fs-3 text-success me-3" v-if="key === 'age'"></i>
                    <i class="bi bi-gender-male fs-3 text-info me-3" v-if="key === 'sex'"></i>
                    <div>
                      <small class="text-muted d-block">{{ label }}</small>
                      <span class="fw-semibold fs-6">{{ user[key] }}</span>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="info-box p-3 bg-white rounded-3 shadow-sm d-flex align-items-start">
                    <i class="bi bi-bag-heart-fill fs-3 text-warning me-3"></i>
                    <div>
                      <small class="text-muted d-block">Sản phẩm mong muốn</small>
                      <span class="fw-semibold fs-6">{{ user.desiredproduct }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center mt-5">
                <button @click="edit" class="btn btn-gradient px-4 py-2 rounded-pill">
                  <i class="bi bi-pencil-square me-2"></i>Chỉnh sửa thông tin
                </button>
              </div>
            </div>

            <!-- Form chỉnh sửa -->
            <div v-else>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Tên người dùng</label>
                  <input v-model="user.username" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Email</label>
                  <input v-model="user.email" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Ảnh đại diện (URL)</label>
                  <input v-model="user.image" class="form-control" />
                </div>
                <div class="col-md-3">
                  <label class="form-label fw-semibold">Tuổi</label>
                  <input v-model="user.age" class="form-control" type="number" />
                </div>
                <div class="col-md-3">
                  <label class="form-label fw-semibold">Giới tính</label>
                  <input v-model="user.sex" class="form-control" />
                </div>
                <div class="col-12">
                  <label class="form-label fw-semibold">Sản phẩm mong muốn</label>
                  <input v-model="user.desiredproduct" class="form-control" />
                </div>
              </div>

              <div class="text-center mt-4">
                <button @click="saveEdit" class="btn btn-success rounded-pill px-4 me-2">
                  <i class="bi bi-save me-2"></i>Lưu
                </button>
                <button @click="isEditing = false" class="btn btn-secondary rounded-pill px-4">
                  <i class="bi bi-x-circle me-2"></i>Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-header {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}
.btn-gradient {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  transition: all 0.3s ease;
}
.btn-gradient:hover {
  opacity: 0.9;
  transform: scale(1.05);
}
.profile-card {
  max-width: 950px;
  margin: 0 auto;
}
.info-box {
  transition: all 0.3s ease;
}
.info-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}
</style>
