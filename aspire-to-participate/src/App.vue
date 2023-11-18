<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { computed, ref } from "vue";
import { useScroll, useWindowScroll } from "@vueuse/core";
const headerRef = ref();
const footerRef = ref();
const countContainerHeight = computed(() => {
  const headerHeight = (headerRef.value as HTMLElement)?.clientHeight || 75;
  const footerHeight = (footerRef.value as HTMLElement)?.clientHeight || 220;
  return `min-height: calc(100% - ${headerHeight + footerHeight}px)`;
});
let scrollList = ref();
function test($event: any) {
  scrollList = $event.value;
}
const el = ref();
// const { y } = useScroll(el, { behavior: "smooth" });
const { x, y } = useWindowScroll({ behavior: "smooth" });
function scrollTo($event: string) {
  // window.scrollTo({top: scrollList[$event], behavior: 'smooth'});
  console.log(scrollList);
  y.value = scrollList[$event];
}
</script>
<template>
  <div class="root" ref="el">
    <div ref="headerRef" class="root-header">
      <Header @atHeader="scrollTo" />
    </div>
    <div class="" :style="countContainerHeight">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <div>
            <component :is="Component" @atScroll="test" />
          </div>
        </transition>
      </router-view>
    </div>
    <div class="root-footer" ref="footerRef">
      <Footer />
    </div>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind variants;
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
::-webkit-scrollbar {
  width: 0px;
  height: 4px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #919191;
  border-radius: 25px;
  padding: 2px;
}
</style>
