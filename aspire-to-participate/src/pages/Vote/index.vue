<script lang="ts" setup>
import candidateImg1 from "@/assets/images/vote/vote-01.png";
import candidateImg2 from "@/assets/images/vote/vote-02.png";
import candidateImg3 from "@/assets/images/vote/vote-03.png";
import candidateImg4 from "@/assets/images/vote/vote-04.png";
import ticketsNational1996 from "@/api/json/1996/ticketsN.json";

import * as echarts from "echarts/core";
import { GridComponent, GridComponentOption } from "echarts/components";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
import { onMounted, Ref, ref } from "vue";

const toRound = (numberToBeRound: number, digit: number) => {
  return Math.floor((numberToBeRound + Number.EPSILON) * 10 ** digit) / 10 ** digit;
};

const candidateList: Array<any> = [
  {
    name: "李東載",
    img: candidateImg1,
    no: 1,
    gradient: "fire-gradient",
    color: "fire-1",
  },
  {
    name: "科軌道",
    img: candidateImg2,
    no: 2,
    gradient: "green-gradient",
    color: "green-1",
  },
  {
    name: "河錫辰",
    img: candidateImg3,
    no: 3,
    gradient: "rose-gradient",
    color: "rose-1",
  },
  {
    name: "徐東珠",
    img: candidateImg4,
    no: 4,
    gradient: "blue-gradient",
    color: "blue-1",
  },
];

const tickets1996: Array<any> = [];
// no type for this key
const key = "00_000_00_000_0000";

candidateList.forEach((candidate) => {
  const found = ticketsNational1996[key].find(
    (data: { cand_no: number }) => data.cand_no === candidate.no
  );
  candidate.totalTickets = found?.ticket_num;
  candidate.totalPercent = found?.ticket_percent;
  candidate.isCurrent = found?.is_current === "Y" ? true : false;
  if (candidate.totalTickets > 1) {
    tickets1996.push(candidate);
  }
});

echarts.use([GridComponent, BarChart, SVGRenderer]);

type EChartsOption = echarts.ComposeOption<GridComponentOption | BarSeriesOption>;

const candidateChart: Ref<HTMLElement | null> = ref(null);

console.log(tickets1996);
const option: EChartsOption = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
};

onMounted(() => {
  const myChart = echarts.init(candidateChart.value);

  myChart.setOption(option);
});
</script>

<template>
  <main class="w-full xs:mx-4 md:mx-auto xl:mx-20 2xl:mx-auto max-w-screen-xl">
    <span class="hidden xs:block text-v-dark-grey text-xs font-sans mb-3"
      >最後更新時間：{{ new Date().toLocaleString() }}</span
    >
    <section
      class="pr-6 xs:px-0 sm:mr-4 md:mx-auto text-v-dark text-4xl xs:text-5xl font-serif leading-normal mb-10 xs:mb-2.5 md:flex justify-between"
    >
      <div class="md:flex">
        <div class="">
          <span class="font-black mr-2 md:mr-4">2024</span
          ><span class="font-semibold md:mr-4">總統大選</span>
        </div>
        <div class="">
          <span class="font-semibold">即時開票全台地圖</span>
        </div>
      </div>
      <div class="relative xs:static cursor-pointer" @click="$router.push('map')">
        <div class="static xs:relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="89"
            height="57"
            viewBox="0 0 89 57"
            fill="none"
            class="animate-shake"
          >
            <line x1="-4.37114e-08" y1="28.5" x2="87" y2="28.5" stroke="#676879" />
            <path d="M60 1L87.5 28.5L60 56" stroke="#676879" />
          </svg>
          <span class="text-v-dark-grey text-sm text-sans absolute left-0 bottom-3.5"
            >台灣地圖</span
          >
        </div>
      </div>
    </section>
    <section ref="candidateChart" class="candidate-chart"></section>
    <section class="candidate-section overflow-scroll px-2 xs:px-0">
      <div class="flex">
        <div class="hidden from-fire-gradient"></div>
        <div class="hidden from-green-gradient"></div>
        <div class="hidden from-rose-gradient"></div>
        <div class="hidden from-blue-gradient"></div>
        <div class="hidden from-fire-1 bg-fire-1 border-fire-1"></div>
        <div class="hidden from-green-1 bg-green-1 border-green-1"></div>
        <div class="hidden from-rose-1 bg-rose-1 border-rose-1"></div>
        <div class="hidden from-blue-1 bg-blue-1 border-blue-1"></div>
        <div
          v-for="(row, index) in tickets1996"
          :key="index"
          :class="`bg-gradient-to-t from-${row.gradient} relative z-0 border-solid border-0 border-l border-${row.color} md:overflow-hidden`"
        >
          <div
            class="min-w-[175px] min-h-[380px] xs:w-[319px] xs:h-[770px] flex flex-col justify-between"
          >
            <dl class="flex flex-col grow-0 pl-1.5">
              <dt class="block text-xs xs:text-sm font-sans font-bold leading-normal">
                得票數
              </dt>
              <div class="block leading-4 font-sans font-bold xs:text-3xl">
                {{ row.totalTickets.toLocaleString() }}
              </div>
            </dl>
            <div class="grow">
              <div
                class="font-sans text-xs font-bold leading-relaxed absolute left-0 xs:text-base w-10 xs:w-16 text-center"
                :style="`bottom: ${row.totalPercent}%`"
              >
                {{ toRound(row.totalPercent, 2) }}%
              </div>
              <div
                :class="`min-w-min w-10 xs:w-16 bg-${row.color} absolute bottom-0 z-10`"
                :style="`height: ${row.totalPercent}%`"
              ></div>
              <img
                :src="row.img"
                alt=""
                class="h-56 md:h-[420px] absolute bottom-0 right-0"
              />
            </div>
          </div>
          <span
            class="text-v-grey font-sans font-bold -z-10 text-[163px] xs:text-[300px] leading-none absolute top-0 left-0 xs:-left-7 opacity-40"
            >{{ row.no }}</span
          >
          <span
            class="text-v-grey font-sans font-bold -z-10 text-6xl xs:text-8xl w-1 absolute right-14 xs:right-24 top-0 whitespace-pre-line opacity-40"
            >{{ row.name }}</span
          >
          <div
            :class="`absolute bg-gradient-to-t from-${row.color} w-full h-11 bottom-0`"
          ></div>
          <img
            v-if="row.isCurrent"
            src="@/assets/images/vote/logo-vote.svg"
            class="absolute w-20 xs:w-40 -top-px -left-px"
            alt=""
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.candidate-chart {
  @apply min-h-[380px] xs:h-[770px];
}
</style>
