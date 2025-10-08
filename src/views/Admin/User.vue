<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";

const users = ref([]);

const user = reactive({
    id: null,
    username: "",
    email: "",
    password: "",
    status: 1,
    role: "",
});

const getUsers = async () => {
    try {
        const res = await axios.get("http://localhost:3000/users");
        users.value = res.data || [];
    } catch (error) {
        console.error("Lỗi tải người dùng:", error);
        alert("Không thể tải người dùng. Kiểm tra server JSON!");
    }
};

const handleSubmit = async () => {
   
    try {
        user.status = Number(user.status);

        if (user.id) {

            await axios.put(`http://localhost:3000/users/${user.id}`, {
                username: user.username,
                email: user.email,
                password: user.password,
                status: user.status,
                role: user.role,
            });
            alert("Cập nhật người dùng thành công!");
        } else {

            await axios.post("http://localhost:3000/users", {
                username: user.username,
                email: user.email,
                password: user.password,
                status: user.status,
                role: user.role,
            });
            alert("Thêm người dùng thành công!");
        }

        await getUsers();
    } catch (error) {
        console.error("Lỗi thêm/cập nhật người dùng:", error);
        alert("Không thể thêm hoặc cập nhật người dùng. Kiểm tra server JSON!");
    }
};

const handleDelete = async (id) => {
  if(!confirm('Bạn có muốn xóa người dùng này không')) return
  try {
    const res = await axios.delete(`http://localhost:3000/users/${id}`);
    getUsers();
  }catch (error) {
    console.error("Lỗi tải người dùng:", error);
    alert("Không thể xóa người dùng. Kiểm tra server JSON!");
  }
};

const edit = (item) => {
  user.id = item.id
  user.name = item.name
  user.email = item.email
  user.password = item.password
  user.status = item.status
  user.role = item.role
}

onMounted(() => {
    getUsers();
});
</script>


<template>
    <div class="container-fluid py-4">
        <div class="row g-4">


            <div class="col-md-7">
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">
                            <i class="bi bi-people-fill me-2"></i>Danh sách người dùng
                        </h5>
                        <button class="btn btn-light btn-sm">
                            <i class="bi bi-arrow-clockwise me-1"></i>Tải lại
                        </button>
                    </div>

                    <div class="table-responsive">
                        <table class="table align-middle table-hover mb-0">
                            <thead class="table-light text-center">
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Role</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr v-for="(user, index) in users" :key="user.id">
                                    <td>{{ index + 1 }}</td>
                                    <td class="fw-semibold text-primary">{{ user.username }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <span class="badge rounded-pill"
                                            :class="user.status ? 'bg-success' : 'bg-secondary'">
                                            {{ user.status ? 'Hoạt động' : 'Ẩn' }}
                                        </span>
                                    </td>
                                    <td>{{ user.role }}</td>
                                    <td>
                                        <button @click="edit(user)" class="btn btn-outline-primary btn-sm me-2">
                                            <i class="bi bi-pencil-square"></i>
                                        </button>
                                        <button @click="handleDelete(user.id)" class="btn btn-outline-danger btn-sm">
                                            <i class="bi bi-trash3"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div class="col-md-5">
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-success text-white">
                        <h5 class="mb-0">
                            <i class="bi bi-person-plus-fill me-2"></i>Thêm / Sửa Người Dùng
                        </h5>
                    </div>
                    <div class="card-body">
                       
                            <div class="mb-3">
                                <label class="form-label fw-bold">ID</label>
                                <input type="text" class="form-control" placeholder="Tự động (nếu thêm mới)" disabled>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold">Username</label>
                                <input type="text" class="form-control" placeholder="Nhập username..."
                                    v-model="user.username">
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold">Email</label>
                                <input type="email" class="form-control" placeholder="Nhập email..."
                                    v-model="user.email">
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold">Password</label>
                                <input type="password" class="form-control" placeholder="Nhập mật khẩu..."
                                    v-model="user.password">
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold">Trạng thái</label>
                                <select v-model="user.status" class="form-select">
                                    <option value="1">Hoạt động</option>
                                    <option value="0">Ẩn</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold">Vai trò</label>
                                <select v-model="user.role" class="form-select">
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>

                            </div>

                            <div class="d-flex justify-content-end">
                                <button type="reset" class="btn btn-secondary me-2">
                                    <i class="bi bi-x-circle me-1"></i>Hủy
                                </button>
                                <button @click="handleSubmit()" type="submit" class="btn btn-success">
                                    <i class="bi bi-save me-1"></i>Lưu
                                </button>
                            </div>
                     
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
