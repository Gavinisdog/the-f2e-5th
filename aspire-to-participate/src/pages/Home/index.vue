<script lang="ts" setup>
import Banner from "./Banner.vue";
import Manifesto from "./Manifesto.vue";
import News from "./News.vue";
import Issues from "@/components/home/Issues.vue";

import { useResizeObserver } from "@vueuse/core";
import { ref } from "vue";

const manifestoRef = ref<HTMLElement | null>(null);
const newsRef = ref<HTMLElement | null>(null);
const donateRef = ref<HTMLElement | null>(null);
const emailRef = ref<HTMLElement | null>(null);
const scrollList = ref({
  manifesto: 0,
  news: 0,
  donate: 0,
  email: 0,
});

const emit = defineEmits(["atScroll"]);
useResizeObserver(document.body, () => {
  emit("atScroll", scrollList);
});
document.body.addEventListener("scroll", () => {
  emit("atScroll", scrollList);
});

function atNews($event: any) {
  scrollList.value.news = $event.value;
}
function atManifesto($event: any) {
  scrollList.value.manifesto = $event.value;
}
function atDonate($event: any) {
  scrollList.value.donate = $event.value;
}
function atMail($event: any) {
  scrollList.value.email = $event.value;
}
import Donate from "@/components/home/donate.vue";
import Email from "@/components/home/email.vue";
</script>

<template>
  <div class="">
    <Banner />
    <Manifesto id="manifesto" ref="manifestoRef" @scrollManifesto="atManifesto" />
    <News id="news" ref="newsRef" @scrollNews="atNews" />
    <Issues id="issues" ref="issuesRef" />
    <Donate id="donate" ref="donateRef" @scrollDonate="atDonate" />
    <Email id="email" ref="emailRef" @scrollMail="atMail" />
  </div>
</template>
