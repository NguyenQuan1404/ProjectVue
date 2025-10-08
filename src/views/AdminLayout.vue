<script setup>
import { ref } from "vue"
import Sidebar from "@/components/Sidebar.vue"
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

const isToggled = ref(false)
const toggleSidebar = () => {
  isToggled.value = !isToggled.value
}
</script>
<template>
  <div class="d-flex" id="wrapper" :class="{ toggled: isToggled }">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Page Content -->
    <div id="page-content-wrapper" class="flex-grow-1 d-flex flex-column">
      <!-- Header -->
      <Header @toggleSidebar="toggleSidebar" />

      <!-- Nội dung chính -->
      <main class="container-fluid mt-3 flex-grow-1">
        <router-view />
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<style>
#wrapper {
  transition: margin 0.3s ease-in-out;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: -250px;
}

#sidebar-wrapper {
  min-height: 100vh;
  width: 250px;
}
</style>