<script setup>

</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container-fluid">
      <button class="btn btn-primary" @click="$emit('toggleSidebar')">
        <i class="bi bi-list"></i>
      </button>
      <span class="ms-3 fw-bold">Hệ thống quản trị</span>
    </div>
  </nav>
</template>
<style scoped>
</style>