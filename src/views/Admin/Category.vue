<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";

const categories = ref([]);

const category = reactive({
  id: null,
  name: "",
  status: 1,
})


// 🟢 Lấy danh sách danh mục
const getCategories = async () => {
  try {
    const res = await axios.get("http://localhost:3000/categories");
    categories.value = res.data;
  } catch (error) {
    console.error("Lỗi tải danh mục:", error);
    alert("Không thể tải danh mục. Kiểm tra server JSON!");
  }
};
const handleSubmit = async () => {
  try {
    if (category.id) {
      // Nếu có id → cập nhật danh mục
      const res = await axios.put(`http://localhost:3000/categories/${category.id}`, {
        name: category.name,
        status: Number(category.status), // đảm bảo kiểu số
      });
    } else {
      // Nếu chưa có id → thêm mới
      const res = await axios.post("http://localhost:3000/categories", {
        name: category.name,
        status: Number(category.status),
      });
    }

    getCategories(); // load lại danh sách
  } catch (error) {
    console.error("Lỗi tải danh mục:", error);
    alert("Không thể thêm hoặc cập nhật danh mục. Kiểm tra server JSON!");
  }
};

const handleDelete = async (id) => {
  if (!confirm('Bạn có chắc muốn xóa danh mục không')) return
  try {
    const res = await axios.delete(`http://localhost:3000/categories/${id}`);
    getCategories();
  } catch (error) {
    console.error("Lỗi tải danh mục:", error);
    alert("Không thể Xóa danh mục. Kiểm tra server JSON!");
  }
}

const eidt = (item) => {
  category.id = item.id
   category.name = item.name
  category.status = item.status
}


onMounted(() => {
  getCategories();

});


</script>

<template>
  <div class="container-fluid py-4">
    <div class="row g-4">
      <!-- ======= BÊN TRÁI: DANH SÁCH DANH MỤC ======= -->
      <div class="col-lg-7">
        <div class="card shadow-sm border-0 rounded-4">
          <div
            class="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4">
            <h5 class="mb-0 fw-bold">
              <i class="bi bi-tags-fill me-2"></i>Danh sách danh mục
            </h5>
          </div>

          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-primary text-center">
                  <tr>
                    <th>#</th>
                    <th>Tên danh mục</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr v-for="(category, index) in categories" :key="category.id">
                    <td>{{ index + 1 }}</td>
                    <td class="fw-semibold text-primary">{{ category.name }}</td>
                    <td>
                      <span class="badge rounded-pill"
                        :class="category.status ? 'bg-success' : 'bg-secondary'">{{ category.status ? 'Hiện' : 'Ẩn' }}</span>
                    </td>
                    <td>
                      <button @click="eidt(category)" class="btn btn-outline-primary btn-sm me-2">
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button @click="handleDelete(category.id)" class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>



                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- ======= BÊN PHẢI: FORM THÊM / SỬA DANH MỤC ======= -->
      <div class="col-lg-5">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-header bg-success text-white fw-bold rounded-top-4">
            <i class="bi bi-plus-circle me-2"></i>Thêm / Sửa danh mục
          </div>

          <div class="card-body">
            <form>
              <div class="mb-3">
                <label class="form-label fw-semibold">Tên danh mục</label>
                <input type="text" class="form-control" placeholder="Nhập tên danh mục..." v-model="category.name" />
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Trạng thái</label>
                <select v-model="category.status" class="form-select">
                  <option value="1">Hoạt động</option>
                  <option value="0">Ẩn</option>
                </select>
              </div>

              <div class="d-flex justify-content-end">
                <button @click="handleSubmit()" type="submit" class="btn btn-primary me-2">
                  <i class="bi bi-save me-1"></i>Lưu
                </button>
                <button type="reset" class="btn btn-secondary">
                  <i class="bi bi-arrow-counterclockwise me-1"></i>Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
  transition: 0.2s;
}

.card-header {
  border-bottom: none;
}
</style>
