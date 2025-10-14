<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";

// 🧱 Danh sách sản phẩm & danh mục
const Products = ref([]);
const Categories = ref([]);

// 🧩 Đối tượng sản phẩm
const Product = reactive({
  id: null,
  name: "",
  category: "",
  price: "",
  quantity: "",
  img: "",
  status: 1,
});

// 🟢 Lấy danh sách sản phẩm
const getProducts = async () => {
  try {
    const res = await axios.get("http://localhost:3000/Products");
    Products.value = res.data;
  } catch (error) {
    console.error("Lỗi tải sản phẩm:", error);
    alert("Không thể tải sản phẩm. Kiểm tra server JSON!");
  }
};

// 🟢 Lấy danh sách danh mục
const getCategories = async () => {
  try {
    const res = await axios.get("http://localhost:3000/categories");
    Categories.value = res.data;
  } catch (error) {
    console.error("Lỗi tải danh mục:", error);
  }
};

// 🟢 Lưu sản phẩm (thêm hoặc cập nhật)
const handleSubmit = async () => {
  try {
    Product.status = Number(Product.status);

    if (Product.id) {
      await axios.put(`http://localhost:3000/Products/${Product.id}`, {
        name: Product.name,
        category: Product.category,
        price: Product.price,
        quantity: Product.quantity,
        img: Product.img,
        status: Product.status,
      });
      alert("✅ Cập nhật sản phẩm thành công!");
    } else {
      await axios.post("http://localhost:3000/Products", {
        name: Product.name,
        category: Product.category,
        price: Product.price,
        quantity: Product.quantity,
        img: Product.img,
        status: Product.status,
      });
      alert("🎉 Thêm sản phẩm thành công!");
    }

    getProducts();
    resetForm();
  } catch (error) {
    console.error("Lỗi thêm/cập nhật sản phẩm:", error);
    alert("Không thể thêm hoặc cập nhật sản phẩm. Kiểm tra server JSON!");
  }
};

// 🧹 Reset form
const resetForm = () => {
  Product.id = null;
  Product.name = "";
  Product.category = "";
  Product.price = "";
  Product.quantity = "";
  Product.img = "";
  Product.status = 1;
};

// 🗑️ Xóa sản phẩm
const handleDelete = async (id) => {
  if (!confirm("Bạn có muốn xóa sản phẩm này không?")) return;
  try {
    await axios.delete(`http://localhost:3000/Products/${id}`);
    getProducts();
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);
    alert("Không thể xóa sản phẩm. Kiểm tra server JSON!");
  }
};

// ✏️ Chỉnh sửa sản phẩm
const edit = (item) => {
  Object.assign(Product, item);
};

onMounted(() => {
  getProducts();
  getCategories();
});
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row g-4">
      <!-- ====== DANH SÁCH SẢN PHẨM ====== -->
      <div class="col-lg-7">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 class="fw-bold mb-0">
              <i class="bi bi-bag-check-fill me-2"></i>Danh sách sản phẩm
            </h5>
          </div>

          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-primary text-center">
                  <tr>
                    <th>#</th>
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Hình ảnh</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr v-for="(p, index) in Products" :key="p.id">
                    <td>{{ index + 1 }}</td>
                    <td class="fw-semibold text-primary">{{ p.name }}</td>
                    <td>{{ p.category }}</td>
                    <td>{{ p.price.toLocaleString("vi-VN") }} ₫</td>
                    <td>{{ p.quantity }}</td>
                    <td>
                      <img
                        :src="p.img"
                        alt="Hình sản phẩm"
                        class="img-thumbnail"
                        style="width: 60px; height: 60px; object-fit: cover;"
                      />
                    </td>
                    <td>
                      <span
                        class="badge rounded-pill"
                        :class="p.status ? 'bg-success' : 'bg-secondary'"
                      >
                        {{ p.status ? "Hiện" : "Ẩn" }}
                      </span>
                    </td>
                    <td>
                      <button @click="edit(p)" class="btn btn-outline-primary btn-sm me-2">
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button @click="handleDelete(p.id)" class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="Products.length === 0">
                    <td colspan="8" class="text-muted py-3">Không có sản phẩm nào</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- ====== FORM THÊM / SỬA ====== -->
      <div class="col-lg-5">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-header bg-success text-white fw-bold rounded-top-4">
            <i class="bi bi-plus-circle me-2"></i>Thêm / Sửa sản phẩm
          </div>

          <div class="card-body">
            <div class="mb-3">
              <label class="form-label fw-semibold">Tên sản phẩm</label>
              <input type="text" class="form-control" v-model="Product.name" placeholder="Nhập tên sản phẩm..." />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Danh mục</label>
              <select class="form-select" v-model="Product.category">
                <option value="">-- Chọn danh mục --</option>
                <option v-for="c in Categories" :key="c.id" :value="c.name">
                  {{ c.name }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Giá (₫)</label>
              <input type="number" class="form-control" v-model="Product.price" placeholder="Nhập giá..." />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Số lượng</label>
              <input type="number" class="form-control" v-model="Product.quantity" placeholder="Nhập số lượng..." />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Hình ảnh (URL)</label>
              <input type="text" class="form-control" v-model="Product.img" placeholder="Nhập link hình ảnh..." />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Trạng thái</label>
              <select class="form-select" v-model="Product.status">
                <option value="1">Hiện</option>
                <option value="0">Ẩn</option>
              </select>
            </div>

            <div class="d-flex justify-content-end">
              <button @click="handleSubmit" class="btn btn-primary me-2">
                <i class="bi bi-save me-1"></i> Lưu
              </button>
              <button @click="resetForm" type="reset" class="btn btn-secondary">
                <i class="bi bi-arrow-counterclockwise me-1"></i> Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
  transition: 0.25s;
}
.card-header {
  border-bottom: none;
}
</style>
