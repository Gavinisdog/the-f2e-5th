<script lang="ts" setup>
const scrollTo = () => {
  console.log(event);
};
const socialList: Array<any> = [
  { label: "Facebook", command: () => scrollTo() },
  { label: "Instagram", command: () => scrollTo() },
  { label: "YouTube", command: () => scrollTo() },
];
</script>

<template>
  <header class="max-h-16 bg-gray-3">
    <div class="header-wrapper">
      <div class="header-inner flex">
        <div class="logo-wrapper">
          <div class="logo-inner flex text-white font-itim text-2xl">
            <div class="logo-english">meow</div>
            <div class="logo-text">喵立翰</div>
          </div>
        </div>
        <nav class="flex">
          <dt class="mx-11">
            <a class="text-pink-2 no-underline" href="#"> 候選人主張</a>
          </dt>
          <dt class="mx-11">
            <a class="text-pink-2 no-underline" href="#"> 最新活動</a>
          </dt>
          <dt class="mx-11">
            <a class="text-pink-2 no-underline" href="#"> 政策議題</a>
          </dt>
          <dt class="mx-11">
            <a class="text-pink-2 no-underline" href="#"> 小額捐款</a>
          </dt>
          <dt class="mx-11">
            <a class="text-pink-2 no-underline" href="#"> 民眾服務</a>
          </dt>
        </nav>
        <div class="contact-wrapper bg-pink-2">
          <div class="contact-inner">
            <SplitButton label="追蹤我們" @click="scrollTo" :model="socialList" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
