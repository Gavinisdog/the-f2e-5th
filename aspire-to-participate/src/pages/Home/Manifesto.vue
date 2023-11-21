<script lang="ts" setup>
import { useElementBounding, useResizeObserver } from "@vueuse/core";
import { ref } from "vue";
const manifestoRef = ref();
const { y } = useElementBounding(manifestoRef);
const emit = defineEmits(["scrollManifesto"]);
useResizeObserver(document.body, () => {
  emit("scrollManifesto", y);
});
document.body.addEventListener("scroll", () => {
  emit("scrollManifesto", y);
});
</script>

<template>
  <section class="w-screen" ref="manifestoRef">
    <div
      class="bg-pink-1 text-white py-1.5 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-widest font-black overflow-hidden"
    >
      <div class="flex max-w-fit mx-auto whitespace-nowrap">
        <span class="m-1.5">為喵星人，護台灣！</span>
        <span class="m-1.5">喵的未來，人的希望</span>
        <span class="m-1.5">從喵的眼中，看見台灣</span>
        <span class="m-1.5">台灣的明天，喵先鋪路</span>
      </div>
    </div>
    <div class="manifesto-wrapper">
      <div class="manifesto-inner flex py-12 px-12 md:pl-24 flex-col md:flex-row">
        <div class="left max-w-[300px] mx-auto">
          <img
            class="max-w-full rounded-3xl"
            src="@/assets/images/home/manifesto.png"
            alt=""
          />
        </div>
        <div class="right md:px-16 pt-5">
          <div class="block">
            <div
              class="text-center md:text-start text-5xl font-black text-pink-1 title mb-2.5"
            >
              候選人主張
            </div>
            <div class="text-xl lg:text-2xl font-extrabold text-gray-2">
              我堅信，藉由推動更完善的<span class="text-pink-1">貓咪福利</span>
            </div>
            <div class="text-xl lg:text-2xl font-extrabold text-gray-2">
              和相關政策，更是間接地投資於<span class="text-pink-1">台灣的未來</span>。
            </div>
            <div class="text-sm text-gray-2 mt-4">
              畢竟，民眾的身心健康與工作熱情是推動經濟的核心動力。透過完善的貓咪福利政策，為台灣的GDP
              經濟帶來巨大效益。<br />
              因此，我期望能在立法院內推進這些政策，確保每一隻貓咪都能得到他們應有的照顧，同時也為台灣的經濟發展助一臂之力。讓我們一同護航台灣的幸福經濟，從照顧每一隻貓咪開始。
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.title {
  -webkit-text-stroke: 2px #fff;
}
.manifesto-wrapper {
  background: linear-gradient(40deg, #000 30%, transparent 30%);
}
.manifesto-inner {
  background: linear-gradient(72deg, #ebb2bf -29.95%, rgba(255, 255, 255, 0.9) 100.32%);
}
</style>
