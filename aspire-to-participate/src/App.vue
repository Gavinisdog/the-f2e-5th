<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { computed, ref } from "vue";

const headerRef = ref();
const footerRef = ref();
const countContainerHeight = computed(() => {
  const headerHeight = (headerRef.value as HTMLElement)?.clientHeight || 75;
  const footerHeight = (footerRef.value as HTMLElement)?.clientHeight || 220;
  return `min-height: calc(100% - ${headerHeight + footerHeight}px)`;
})
</script>
<template>
  <div class="root">
    <div ref="headerRef" class="root-header" >
      <Header />
    </div>
    <div class="container" :style="countContainerHeight">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <div>
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
    <div class="root-footer">
      <Footer />
    </div>
  </div>
</template>

<style>
@font-face {
  font-family: "TwinkleStar";
  src: url("@/assets/css/font/TwinkleStar-Regular.ttf");
  font-style: normal;
  font-weight: 400;
}

@font-face {
  font-family: "Itim";
  src: url("@/assets/css/font/Itim-Regular.ttf");
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
