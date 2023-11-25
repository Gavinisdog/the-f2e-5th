<script setup lang="ts">
import { Ref, ref } from "vue";

const isShow: Ref = ref(false);
const toggleFooter = () => {
  isShow.value = !isShow.value;
};
const isMarqueeMove = ref(false);
</script>

<template>
  <footer>
    <div class="bottom-0 fixed">
      <div>
        <a
          href="https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E7%B8%BD%E7%B5%B1%E5%8F%8A%E5%89%AF%E7%B8%BD%E7%B5%B1%E5%85%AC%E6%B0%91%E7%9B%B4%E6%8E%A5%E9%81%B8%E8%88%89%E5%88%97%E8%A1%A8"
        >
          <MarqueeText
            class="text-v-dark text-sm font-bold py-2 w-screen"
            :duration="30"
            :paused="isMarqueeMove"
            @mouseenter="isMarqueeMove = !isMarqueeMove"
            @mouseleave="isMarqueeMove = false"
            >總統及副總統由公民直接選舉的呼聲自1990年代初期開始醞釀。1994年憲法第三次增修後確立了總統、副總統由人民「直接選舉」產生。1996年3月23日中華民國舉行了歷史上第一次的公民直接選舉總統、副總統。自此開始，中華民國公民每隔四年例行舉辦選舉直選國家元首成為常態，為臺灣民主政治體制的一部份。</MarqueeText
          >
        </a>
        <div
          @click="toggleFooter"
          class="bg-v-grey border-none outline-none w-full rounded-none text-v-dark py-2 min-w-fit mx-auto text-center cursor-pointer"
        >
          <Icon icon="ic:outline-keyboard-arrow-up" class="h-4" />
        </div>
      </div>
    </div>
    <transition name="footer-slide">
      <template v-if="isShow">
        <div
          @click="toggleFooter"
          class="bg-v-grey w-full rounded-none text-v-dark py-2 min-w-fit mx-auto text-center absolute bottom-0 cursor-pointer"
        >
          <Icon icon="ic:outline-keyboard-arrow-up" class="h-4" :rotate="2" />
          <div
            class="p-0 bg-v-grey w-full rounded-none pt-1 text-v-dark flex flex-col items-center font-sans"
          >
            <span class="mb-1 text-[10px] leading-4 font-bold">© aspire team 2023</span>
            <div class="flex">
              <span class="text-[10px] leading-4 px-1 border-solid border-0 border-r"
                >製作團隊</span
              >
              <span class="text-[10px] leading-4 mx-1">前端工程師</span>
              <span class="text-[10px] leading-4 mx-1 font-bold">Gavin</span>
              <span
                class="text-[10px] leading-4 px-1 font-bold border-solid border-0 border-r"
                >Mick</span
              >
              <span class="text-[10px] leading-4 mx-1">UI設計師</span>
              <span class="text-[10px] leading-4 font-bold mx-1">葉聿昕</span>
              <span class="text-[10px] leading-4 font-bold mx-1">Coral</span>
            </div>
          </div>
        </div>
      </template>
    </transition>
  </footer>
</template>

<style scoped lang="scss">
.footer-slide-enter-active,
.footer-slide-leave-active {
  transition: all 0.3s ease;
}
.footer-slide-enter-from,
.footer-slide-leave-to {
  transform: translateY(100%);
}
.footer-slide-enter-to,
.footer-slide-leave-from {
  transform: translateY(0%);
}
</style>
