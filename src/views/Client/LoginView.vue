<script setup>
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";



const router = useRouter();

const form = reactive({
  email: "",
  password: ""
});

const handleLogin = async () => {
  if (!form.email || !form.password) {
    alert("Please enter email and password!");
    return;
  }

  try {
    const res = await axios.get("http://localhost:3000/users");
    const users = res.data;

    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));

      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      alert("Email or password is incorrect!");
    }
  } catch (error) {
    console.error("Lỗi login:", error);
    alert("Đăng nhập thất bại! Kiểm tra lại server JSON.");
  }
};
</script>

<template>
  <div
    class="d-flex align-items-center justify-content-center min-vh-100"
    style="background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);"
  >
    <div
      class="card border-0 shadow-lg rounded-5 p-4"
      style="max-width: 400px; width: 100%; background-color: #fff;"
    >
      <div class="text-center mb-4">
        <div
          class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 p-3 mb-3"
        >
          <i class="bi bi-person-lock text-primary fs-1"></i>
        </div>
        <h3 class="fw-bold text-dark">Welcome Back 👋</h3>
        <p class="text-muted mb-0">Please login to your account</p>
      </div>

      <div class="mb-3">
        <label class="form-label fw-semibold">Email</label>
        <div class="input-group">
          <span class="input-group-text bg-light"><i class="bi bi-envelope"></i></span>
          <input
            v-model="form.email"
            type="email"
            class="form-control border-start-0"
            placeholder="example@email.com"
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label fw-semibold">Password</label>
        <div class="input-group">
          <span class="input-group-text bg-light"><i class="bi bi-lock"></i></span>
          <input
            v-model="form.password"
            type="password"
            class="form-control border-start-0"
            placeholder="Enter your password"
          />
        </div>
      </div>

      <button
        type="button"
        @click="handleLogin"
        class="btn btn-primary w-100 py-2 fw-semibold rounded-pill"
        style="background: linear-gradient(90deg, #6a11cb, #2575fc); border: none;"
      >
        <i class="bi bi-box-arrow-in-right me-2"></i> Login
      </button>

      <div class="text-center mt-4">
        <small class="text-muted"
          >Don't have an account?
          <a href="/sign" class="fw-semibold text-primary text-decoration-none"
            >Sign up</a
          ></small
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
input:focus {
  box-shadow: none !important;
  border-color: #2575fc !important;
}
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
}
</style>
