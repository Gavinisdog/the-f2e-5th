<script lang="ts" setup>
import candidateImg1 from "@/assets/images/vote/vote-01.png";
import candidateImg2 from "@/assets/images/vote/vote-02.png";
import candidateImg3 from "@/assets/images/vote/vote-03.png";
import candidateImg4 from "@/assets/images/vote/vote-04.png";
import ticketsNational1996 from "@/api/json/1996/ticketsN.json";

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

candidateList.forEach((candidate) => {
  const found = ticketsNational1996.data.find((data) => data.cand_no === candidate.no);
  candidate.totalTickets = found?.ticket_num;
  candidate.totalPercent = found?.ticket_percent;
  candidate.isCurrent = found?.is_current === "Y" ? true : false;
  if (candidate.totalTickets > 1) {
    tickets1996.push(candidate);
  }
});
</script>

<template>
  <main class="w-full sm:mx-4 xs:mx-auto 2xl:mx-20 max-w-screen-xl 2xl:max-w-none">
    <span class="hidden xs:block text-v-dark-grey text-xs font-sans mb-3"
      >最後更新時間：{{ new Date().toLocaleString() }}</span
    >
    <section
      class="px-6 xs:px-0 text-v-dark text-4xl xs:text-5xl font-serif leading-normal mb-10 xs:mb-2.5 xs:flex"
    >
      <div class="">
        <span class="font-black mr-2 xs:mr-4">2024</span
        ><span class="font-semibold xs:mr-4">總統大選</span>
      </div>
      <div class="">
        <span class="font-semibold">即時開票全台地圖</span>
      </div>
    </section>
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
          :class="`bg-gradient-to-t from-${row.gradient} relative z-0 border-solid border-0 border-l border-${row.color} overflow-hidden`"
        >
          <div
            class="min-w-[175px] min-h-[380px] w-[319px] h-[770px] flex flex-col justify-between"
          >
            <dl class="flex flex-col grow-0 pl-1.5">
              <dt class="block text-xs font-sans font-bold leading-normal">得票數</dt>
              <div class="block leading-4 font-sans font-bold">
                {{ row.totalTickets.toLocaleString() }}
              </div>
            </dl>
            <div class="grow">
              <div
                class="block font-sans text-xs font-bold leading-relaxed absolute left-0 pl-1.5"
                :style="`bottom: ${row.totalPercent}%`"
              >
                {{ toRound(row.totalPercent, 2) }}%
              </div>
              <div
                :class="`min-w-min w-10 bg-${row.color} absolute bottom-0 z-10`"
                :style="`height: ${row.totalPercent}%`"
              ></div>
              <img :src="row.img" alt="" class="h-56 absolute bottom-0 right-0" />
            </div>
          </div>
          <span
            class="text-v-grey font-sans font-bold -z-10 text-[163px] xs:text-[300px] leading-none absolute top-0 left-0 opacity-40"
            >{{ row.no }}</span
          >
          <span
            class="text-v-grey font-sans font-bold -z-10 text-6xl xs:text-8xl w-1 absolute right-14 top-0 whitespace-pre-line opacity-40"
            >{{ row.name }}</span
          >
          <div
            :class="`absolute bg-gradient-to-t from-${row.color} w-full h-11 bottom-0`"
          ></div>
          <img
            src="@/assets/images/vote/logo-vote.svg"
            class="absolute w-20 xs:w-40"
            alt=""
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.candidate-section {
}
</style>
