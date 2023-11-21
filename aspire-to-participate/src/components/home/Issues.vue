<template>
  <section
    class="issues-wrapper bg-gradient-to-b from-pink-1 to-gray-3 w-screen py-[50px]"
  >
    <div class="issues-inner px-6 md:px-12 lg:px-24">
      <div class="title-inner text-5xl font-black text-gray-3 mb-12">政策議題</div>
      <div class="issue-block-container flex flex-col gap-7 md:gap-[100px] px-5">
        <div
          class="issue-block flex flex-col md:flex-row gap-[60px] justify-center items-center relative md:items-stretch"
          v-for="(issue, index) in issuelist"
          :key="issue.id"
        >
          <!-- md:items-end -->
          <!-- max-w-[480px] aspect-auto object-cover flex-shrink-0 -->
          <div
            class="imagBox relative order-0"
            :class="index % 2 === 1 ? 'md:order-[1]' : 'md:order-[0]'"
          >
            <img :src="issue.image" :alt="issue.title" class="imageSrc rounded-sm" />
          </div>
          <div
            class="p-2 flex-grow max-w-[500px] relative flex"
            :class="index % 2 === 1 ? 'text-right' : 'text-left'"
          >
            <div class="issue-desri text-white self-end flex flex-col gap-4">
              <div
                class="absolute top-[0%] bottom-[0%] z-50 hidden md:block"
                :class="index % 2 === 1 ? '-right-1/4' : '-left-1/4'"
              >
                <div
                  class="flex flex-col gap-5"
                  :class="index % 2 === 1 ? 'items-end' : 'items-start'"
                >
                  <div class="font-black">
                    <span
                      class="inline-block px-5 py-2.5 ab-title text-pink-2 bg-white"
                      >{{ issue.title }}</span
                    >
                  </div>
                  <div class="font-black">
                    <span
                      class="inline-block px-5 py-2.5 ab-title text-pink-2 bg-white"
                      >{{ issue.secTitle }}</span
                    >
                  </div>
                </div>
              </div>
              <div
                v-for="(descr, idx) in issue.desc"
                :key="idx"
                class="flex flex-col gap-2"
              >
                <div class="text-2xl leading-7 font-black max-w-[500px]">
                  {{ descr.descTitle }}
                </div>
                <div class="text-base leading-7 text-normal max-w-[500px]">
                  {{ descr.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import image01 from "@/assets/images/home/issue01.png";
import image02 from "@/assets/images/home/issue02.png";
import image03 from "@/assets/images/home/issue03.png";
// 載入圖片功能

const issuelist = ref([
  {
    id: 1,
    image: image01,
    title: "為毛孩子謀福利！",
    secTitle: "推動寵物醫療保障方案",
    desc: [
      {
        descTitle: "設立寵物醫療基金",
        content: "每年撥款新台幣 10 億元，專款專用於支援家庭寵物的醫療費用",
      },
      {
        descTitle: "提供醫療補助",
        content: "每隻寵物每年可獲得高達新台幣 20,000 元的醫療補助，減輕飼主的經濟壓力",
      },
      {
        descTitle: "合作動物醫院",
        content: "目前已有和超過 200 家動物醫院進行初步的合作討論",
      },
    ],
  },
  {
    id: 2,
    image: image02,
    title: "打造休閒天堂！",
    secTitle: "推廣寵物休閒與娛樂場所",
    desc: [
      {
        descTitle: "建立寵物公園",
        content:
          "每年撥款新台幣 5 億元，用於在各大都市建立專屬的寵物公園。根據初步規劃，預計在第一年內，將在全國範圍內建立至少 10 座寵物公園",
      },
      {
        descTitle: "推廣寵物友善商家",
        content:
          "鼓勵商家提供寵物友善的環境，並為參與的商家提供稅收優惠。預計在政策實施後的首年，將有超過 500 家商家加入此計畫",
      },
      {
        descTitle: "舉辦寵物活動和工作坊",
        content:
          "與各大寵物社團和組織合作，每年舉辦至少 5 場大型的寵物活動，包括寵物才藝比賽、飼養知識工作坊等",
      },
    ],
  },
  {
    id: 3,
    image: image03,
    title: "推廣寵物飼養教育，",
    secTitle: "讓愛更加專業",
    desc: [
      {
        descTitle: "建立寵物飼養教育中心",
        content:
          "每年撥款新台幣 3 億元，用於在全國各地建立專業的寵物飼養教育中心。預計在第一年內，在全國至少 5 大城市設立教育中心",
      },
      {
        descTitle: "推廣寵物飼養課程",
        content:
          "與學校、社區組織和寵物社團合作，推出一系列免費的寵物飼養課程。預計每年將有超過 10,000 名市民受益",
      },
      {
        descTitle: "製作教育資料",
        content:
          "出版寵物飼養手冊、影片和線上課程，讓所有有意飼養寵物的家庭都能輕鬆取得正確的知識",
      },
    ],
  },
]);
</script>
<style lang="scss" scoped>
.imagBox {
  max-width: 480px;
  max-height: 520px;
  width: 100%;
  // min-height: calc(520px + 8.5vw);
}
.imageSrc {
  width: 100%;
  height: 100%;
  object-fit: contain;
  // min-height: calc(520px + 8.5vw);
}
.ab-title {
  font-size: 3.5vw;
  @media (min-width: 1280px) {
    font-size: 40px;
  }
}
</style>
