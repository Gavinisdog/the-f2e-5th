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
  <header class="max-h-16 bg-gray-3 h-16">
    <div class="header-wrapper">
      <div class="header-inner flex">
        <div class="logo-wrapper">
          <div class="logo-inner flex text-white text-2xl">
            <div class="logo-english font-itim leading-[3.5rem] px-5">meow</div>
            <div class="logo-text leading-[4rem]">喵立翰</div>
          </div>
        </div>
        <nav class="flex px-9">
          <dt class="mx-11">
            <a class="text-pink-2 no-underline leading-[4rem] w-min" href="#"> 候選人主張</a>
          </dt>
          <dt class="mx-11">
            <a class="text-pink-2 no-underline leading-[4rem] w-min" href="#"> 最新活動</a>
          </dt>
          <dt class="mx-11">
            <a class="text-pink-2 no-underline leading-[4rem] w-min" href="#"> 政策議題</a>
          </dt>
          <dt class="mx-11">
            <a class="text-pink-2 no-underline leading-[4rem] w-min" href="#"> 小額捐款</a>
          </dt>
          <dt class="mx-11">
            <a class="text-pink-2 no-underline leading-[4rem] w-min" href="#"> 民眾服務</a>
          </dt>
        </nav>
        <div class="contact-wrapper mr-auto">
          <div class="contact-inner">
            <SplitButton class="header-dropdown" label="追蹤我們" @click="scrollTo" :model="socialList" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
:deep(.header-dropdown){
  // @apply ;
  button{
    @apply bg-pink-2 outline-none border-0 ;
  }
}
</style>