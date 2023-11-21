<template>
  <!-- 之後放 Header -->
  <router-view />
  <!-- 之後放 footer -->
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
onMounted(() => {
  if (route.fullPath === "/") {
    router.push("/login");
  }
});
</script>
