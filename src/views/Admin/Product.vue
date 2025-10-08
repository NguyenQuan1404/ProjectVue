<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";

// Danh sách sản phẩm
const Products = ref([]);

// Đối tượng sản phẩm đang nhập
const Product = reactive({
  id: null,
  name: "",
  price: "",
  quantity: "",
  img: "",
  status: 1,
});

// === Hàm lấy danh sách sản phẩm ===
const getProducts = async () => {
  try {
    const res = await axios.get("http://localhost:3000/Products");
    Products.value = res.data;
  } catch (error) {
    console.error("Lỗi tải sản phẩm:", error);
    alert("Không thể tải sản phẩm. Kiểm tra server JSON!");
  }
};

const handleSubmit = async () => {
  try {
    Product.status = Number(Product.status);

    if (Product.id) {
      await axios.put(`http://localhost:3000/Products/${Product.id}`, {
        name: Product.name,
        price: Product.price,
        quantity: Product.quantity,
        img: Product.img,
        status: Product.status,
      });
      alert("Cập nhật sản phẩm thành công!");
    } else {
      await axios.post("http://localhost:3000/Products", {
        name: Product.name,
        price: Product.price,
        quantity: Product.quantity,
        img: Product.img,
        status: Product.status,
      });
      alert("Thêm sản phẩm thành công!");
    }

    getProducts(); 
  } catch (error) {
    console.error("Lỗi thêm/cập nhật sản phẩm:", error);
    alert("Không thể thêm hoặc cập nhật sản phẩm. Kiểm tra server JSON!");
  }
};

const handleDelete = async (id) => {
  if(!confirm('Bạn có muốn xóa sản phẩm này không')) return
  try {
    const res = await axios.delete(`http://localhost:3000/Products/${id}`);
    getProducts();
  }catch (error) {
    console.error("Lỗi tải sản phẩm:", error);
    alert("Không thể xóa sản phẩm. Kiểm tra server JSON!");
  }
}

const edit = (item) => {
  Product.id = item.id
  Product.name = item.name
  Product.price = item.price
  Product.quantity = item.quantity
  Product.img = item.img
  Product.status = item.status
}


onMounted(() => {
  getProducts();
});
</script>



<template>
  <div class="container-fluid py-4">
    <div class="row g-4">
      <!-- ======= BÊN TRÁI: DANH SÁCH SẢN PHẨM ======= -->
      <div class="col-lg-7">
        <div class="card shadow-sm border-0 rounded-4">
          <div
            class="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4">
            <h5 class="mb-0 fw-bold">
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
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Hình ảnh</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr v-for="(Product, index) in Products" :key="Product.id">
                    <td>{{ index + 1 }}</td>
                    <td class="fw-semibold text-primary">{{ Product.name }}</td>
                    <td>{{ Product.price }}</td>
                    <td>{{ Product.quantity }}</td>
                    <td>
                      <img :src="Product.img" alt="Hình sản phẩm"
                        class="img-thumbnail" style="width: 60px; height: 60px; object-fit: cover;">
                    </td>
                     <td>
                      <span class="badge rounded-pill"
                        :class="Product.status ? 'bg-success' : 'bg-secondary'">{{ Product.status ? 'Hiện' : 'Ẩn' }}</span>
                    </td>
                    <td>
                      <button @click="edit(Product)" class="btn btn-outline-primary btn-sm me-2">
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button @click="handleDelete(Product.id)" class="btn btn-outline-danger btn-sm">
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

      <!-- ======= BÊN PHẢI: FORM THÊM / SỬA SẢN PHẨM ======= -->
      <div class="col-lg-5">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-header bg-success text-white fw-bold rounded-top-4">
            <i class="bi bi-plus-circle me-2"></i>Thêm / Sửa sản phẩm
          </div>

          <div class="card-body">
            <form>
              <div class="mb-3">
                <label class="form-label fw-semibold">Tên sản phẩm</label>
                <input type="text" class="form-control" placeholder="Nhập tên sản phẩm..." v-model="Product.name" />
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Giá (₫)</label>
                <input type="number" class="form-control" placeholder="Nhập giá..." v-model="Product.price" />
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Số lượng</label>
                <input type="number" class="form-control" placeholder="Nhập số lượng..." v-model="Product.quantity"/>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Hình ảnh (URL)</label>
                <input type="text" class="form-control" placeholder="Nhập link hình ảnh..." v-model="Product.img"/>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Trạng thái</label>
                <select v-model="Product.status" class="form-select">
                  <option value="1">Hiện</option>
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

