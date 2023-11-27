<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import VoteHeader from "@/components/VoteHeader.vue";
import VoteFooter from "@/components/VoteFooter.vue";
import { computed, ref } from "vue";
import router from "./router";
// import {  useWindowScroll } from "@vueuse/core";
const headerRef = ref();
const footerRef = ref();
const countContainerHeight = computed(() => {
  const headerHeight = (headerRef.value as HTMLElement)?.clientHeight || 75;
  const footerHeight = (footerRef.value as HTMLElement)?.clientHeight || 220;
  return `min-height: calc(100% - ${headerHeight + footerHeight}px)`;
});
const el = ref();
// const { y } = useScroll(el, { behavior: "smooth" });
// const { x, y } = useWindowScroll({ behavior: "smooth" });
// function scrollTo($event: string) {
//   // window.scrollTo({top: scrollList[$event], behavior: 'smooth'});
//   console.log(scrollList);
//   y.value = scrollList[$event];
// }
</script>
<template>
  <div class="root" ref="el">
    <div ref="headerRef" class="root-header">
      <Header v-if="router.currentRoute.value.name === 'home'" />
      <VoteHeader v-else class="overflow-hidden" />
    </div>
    <div class="" :style="countContainerHeight">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <div>
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
    <div class="root-footer" ref="footerRef">
      <Footer v-if="router.currentRoute.value.name === 'home'" />
      <VoteFooter v-else class="overflow-hidden" />
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

@font-face {
  font-family: "NotoSans";
  src: url("@/assets/css/font/NotoSansTC-VariableFont.ttf");
}
@font-face {
  font-family: "NotoSerif";
  src: url("@/assets/css/font/NotoSerifTC-ExtraLight.otf");
  font-style: normal;
  font-weight: 200;
}
@font-face {
  font-family: "NotoSerif";
  src: url("@/assets/css/font/NotoSerifTC-Light.otf");
  font-style: normal;
  font-weight: 300;
}
@font-face {
  font-family: "NotoSerif";
  src: url("@/assets/css/font/NotoSerifTC-Regular.otf");
  font-style: normal;
  font-weight: 400;
}
@font-face {
  font-family: "NotoSerif";
  src: url("@/assets/css/font/NotoSerifTC-Medium.otf");
  font-style: normal;
  font-weight: 500;
}
@font-face {
  font-family: "NotoSerif";
  src: url("@/assets/css/font/NotoSerifTC-SemiBold.otf");
  font-style: normal;
  font-weight: 600;
}
@font-face {
  font-family: "NotoSerif";
  src: url("@/assets/css/font/NotoSerifTC-Bold.otf");
  font-style: normal;
  font-weight: 700;
}
@font-face {
  font-family: "NotoSerif";
  src: url("@/assets/css/font/NotoSerifTC-Black.otf");
  font-style: normal;
  font-weight: 900;
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
