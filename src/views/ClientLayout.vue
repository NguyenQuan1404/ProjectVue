<script setup>
import HeaderClient from '@/components/HeaderClient.vue';
import FooterClient from '@/components/FooterClient.vue';
</script>

<template>
  <div>
    <!-- Header -->
    <HeaderClient />

    <!-- Nội dung trang -->
    <main class="container my-4">
      <router-view />
    </main>

    <!-- Footer -->
    <FooterClient />
  </div>
</template>