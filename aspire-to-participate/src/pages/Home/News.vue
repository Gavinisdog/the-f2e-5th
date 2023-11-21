<script lang="ts" setup>
import image1 from "@/assets/images/home/news1.jpeg";
import image2 from "@/assets/images/home/news2.jpeg";
import image3 from "@/assets/images/home/news3.jpeg";

const newsList: Array<any> = [
  {
    date: new Date(2023, 11, 26),
    title: "參與台北寵物論壇，爭取貓咪友善環境",
    content:
      "炎炎夏日的周六，我走進了台北寵物論壇，帶著一副貓耳髮箍，決定要全力宣傳「貓咪至上」的理念！我相信，我們的都市中，每一隻貓咪都應該有自己的 VIP 休憩空間。",
    img: image1,
  },
  {
    date: new Date(2023, 11, 24),
    title: "掃街模式開啟！帶著你的貓耳，來和我一起走！",
    content:
      "街上氣氛真的很棒，從小孩到大人，甚至有些狗狗朋友都帶著貓耳來找我握手，真的太可愛了！這次的活動不僅讓我看到大家的熱情，更加堅定了我推進「貓咪友善環境」政策的決心。",
    img: image2,
  },
  {
    date: new Date(2023, 11, 20),
    title: "收容所模特兒大比拼！",
    content:
      "今天的收容所不再是一片寂靜。為了讓更多人認識到這裡的毛孩子，我們舉辦了一場前所未有的「模特兒走秀」！",
    img: image3,
  },
];
</script>

<template>
  <section class="news-wrapper bg-gray-3 w-screen">
    <div class="news-inner px-6 md:px-12 lg:px-24">
      <div class="title-wrapper py-12">
        <div class="title-inner text-pink-2 text-5xl font-black">最新消息</div>
      </div>
      <div class="news-container pb-20">
        <div class="all-news pl-3 md:pl-12 overflow-x-hidden h-[360px]">
          <div v-for="(news, index) in newsList" :key="index">
            <div class="single-inner flex">
              <div class="news-date text-white font-extrabold">
                <div class="flex flex-col items-end md:mr-10">
                  <span class="date-date text-4xl md:text-7xl md:w-24">
                    {{ news.date.getDate() }}
                  </span>
                  <span class="date-month text-xl md:text-3xl">
                    {{
                      news.date.toLocaleString("eng", { month: "short" }).toUpperCase()
                    }}
                  </span>
                </div>
              </div>
              <div
                class="news-timeline text-pink-2 flex items-center relative md:ml-3.5 md:mr-14"
              >
                <Icon icon="octicon:dot-fill-24" class="w-12 h-12" />
              </div>
              <div class="news-content flex pb-11 flex-col lg:flex-row">
                <div class="news-img lg:max-w-[200px]">
                  <img
                    class="max-w-full rounded-tl-2xl rounded-tr-2xl lg:rounded-bl-2xl lg:rounded-br-none lg:rounded-tr-none lg:rounded-tl-2xl"
                    :src="news.img"
                    alt=""
                  />
                </div>
                <div
                  class="news-text lg:max-h-[200px] px-8 py-9 bg-white rounded-br-2xl rounded-bl-2xl lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-2xl lg:rounded-br-2xl overflow-x-hidden"
                >
                  <div class="news-title text-2xl font-extrabold">{{ news.title }}</div>
                  <div class="news-content text-base">{{ news.content }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.news-timeline {
  &::after {
    width: 5px;
    left: 46%;
    content: "";
    position: absolute;
    background-color: #ebb2bf;
    display: block;
    justify-content: center;
    height: 100%;
  }
}
</style>
