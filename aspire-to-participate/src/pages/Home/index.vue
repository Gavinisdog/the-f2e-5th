<script lang="ts" setup>
import Banner from "./Banner.vue";
import Manifesto from "./Manifesto.vue";
import News from "./News.vue";
import donate from "@/components/home/donate.vue";
import email from "@/components/home/email.vue";

import { useElementBounding, useResizeObserver } from "@vueuse/core";
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
</script>

<template>
  <div class="">
    <Banner />
    <Manifesto ref="manifestoRef" @scrollManifesto="atManifesto" />
    <News ref="newsRef" @scrollNews="atNews" />
    <donate ref="donateRef" @scrollDonate="atDonate" />
    <email ref="emailRef" @scrollMail="atMail" />
  </div>
</template>
