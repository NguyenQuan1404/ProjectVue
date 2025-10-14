<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const API_BASE = import.meta.env.VITE_NGROK_URL || 'http://localhost:3000';
console.log(API_BASE)

const router = useRouter();
const form = reactive({
  username: "",
  email: "",
  password: "",
  status: "1",
  role: "user"
});

const handleSignUp = async () => {
  if (!form.username || !form.email || !form.password) {
    alert("Please fill in all fields!");
    return;
  }

  try {
    await axios.post(`${API_BASE}/users`, form);
    router.push("/login");
  } catch (error) {
    console.error("Lỗi đăng kí:", error);
    alert("Đăng kí thất bại!");
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
      style="max-width: 430px; width: 100%; background-color: #fff;"
    >
      <div class="text-center mb-4">
        <div
          class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 p-3 mb-3"
        >
          <i class="bi bi-person-plus-fill text-primary fs-1"></i>
        </div>
        <h3 class="fw-bold text-dark">Create Account ✨</h3>
        <p class="text-muted mb-0">Join us today! Fill in your details.</p>
      </div>

      <div class="mb-3">
        <label class="form-label fw-semibold">Username</label>
        <div class="input-group">
          <span class="input-group-text bg-light"><i class="bi bi-person"></i></span>
          <input
            v-model="form.username"
            type="text"
            class="form-control border-start-0"
            placeholder="Enter username"
          />
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-semibold">Email</label>
        <div class="input-group">
          <span class="input-group-text bg-light"><i class="bi bi-envelope"></i></span>
          <input
            v-model="form.email"
            type="email"
            class="form-control border-start-0"
            placeholder="Enter your email"
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
            placeholder="Enter password"
          />
        </div>
      </div>

      <button
        type="button"
        @click="handleSignUp"
        class="btn btn-primary w-100 py-2 fw-semibold rounded-pill"
        style="background: linear-gradient(90deg, #6a11cb, #2575fc); border: none;"
      >
        <i class="bi bi-person-check me-2"></i> Sign Up
      </button>

      <div class="text-center mt-4">
        <small class="text-muted"
          >Already have an account?
          <a href="/login" class="fw-semibold text-primary text-decoration-none"
            >Login</a
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
