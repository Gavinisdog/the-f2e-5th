<script lang="ts" setup>
import { useWindowScroll, useWindowSize } from "@vueuse/core";
import { ref } from "vue";

const { y } = useWindowScroll({ behavior: "smooth" });
const scrollTo = ($event:any) => {
  const el = document.getElementById($event);
  if (el?.offsetTop !== undefined){
  y.value = el?.offsetTop - 65;}
};
const emit = defineEmits(["atHeader"]);
const { width } = useWindowSize();

const visible = ref(false);

const socialList: Array<any> = [
  { label: "Facebook", command: () => scrollTo("email") },
  { label: "Instagram", command: () => scrollTo("email") },
  { label: "YouTube", command: () => scrollTo("email") },
];
</script>

<template>
  <header class="min-h-[64px] w-full bg-gray-3 h-16 md:h-14 fixed z-50">
    <div class="header-wrapper">
      <div class="header-inner flex">
        <div class="logo-wrapper">
          <div class="logo-inner flex text-white text-2xl">
            <div class="logo-english font-itim leading-[3.5rem] px-5">meow</div>
            <div class="logo-text leading-[4rem] whitespace-nowrap">喵立翰</div>
          </div>
        </div>
        <div class="overflow-y-hidden mx-8 min-h-full">
          <nav class="flex items-center" v-if="width > 768">
            <dt class="px-5 w-min cursor-pointer whitespace-nowrap">
              <a
                class="text-pink-2 block h-[60px] hover:text-white no-underline leading-[3.75rem] w-min"
                @click="scrollTo('manifesto')"
              >
                候選人主張</a
              >
            </dt>
            <dt class="px-5 w-min cursor-pointer whitespace-nowrap">
              <a
                class="text-pink-2 block h-[60px] hover:text-white no-underline leading-[3.75rem] w-min"
                @click="scrollTo('news')"
              >
                最新活動</a
              >
            </dt>
            <dt class="px-5 w-min cursor-pointer whitespace-nowrap">
              <a
                class="text-pink-2 block h-[60px] hover:text-white no-underline leading-[3.75rem] w-min"
                @click="scrollTo('issue')"
              >
                政策議題</a
              >
            </dt>
            <dt class="px-5 w-min cursor-pointer whitespace-nowrap">
              <a
                class="text-pink-2 block h-[60px] hover:text-white no-underline leading-[3.75rem] w-min"
                @click="scrollTo('donate')"
              >
                小額捐款</a
              >
            </dt>
            <dt class="px-5 w-min cursor-pointer whitespace-nowrap">
              <a
                class="text-pink-2 block h-[60px] hover:text-white no-underline leading-[3.75rem] w-min"
                @click="scrollTo('email')"
              >
                民眾服務</a
              >
            </dt>
          </nav>
        </div>
        <div class="contact-wrapper ml-auto mr-16" v-if="width > 768">
          <div class="contact-inner">
            <SplitButton
              class="header-dropdown"
              label="追蹤我們"
              @click="scrollTo"
              :model="socialList"
              rounded
            />
          </div>
        </div>
        <div v-else class="ml-auto">
          <Sidebar v-model:visible="visible" position="full" class="header-drawer">
            <nav class="text-center">
              <dt class="px-5 w-min cursor-pointer whitespace-nowrap">
                <a
                  class="text-pink-2 block h-[60px] hover:text-white no-underline leading-[3.75rem] w-min"
                  @click="scrollTo('manifesto'), (visible = false)"
                >
                  候選人主張</a
                >
              </dt>
              <dt class="px-5 w-min cursor-pointer whitespace-nowrap">
                <a
                  class="text-pink-2 block h-[60px] hover:text-white no-underline leading-[3.75rem] w-min"
                  @click="scrollTo('news'), (visible = false)"
                >
                  最新活動</a
                >
              </dt>
              <dt class="px-5 w-min cursor-pointer whitespace-nowrap">
                <a
                  class="text-pink-2 block h-[60px] hover:text-white no-underline leading-[3.75rem] w-min"
                  @click="scrollTo('issue'), (visible = false)"
                >
                  政策議題</a
                >
              </dt>
              <dt class="px-5 w-min cursor-pointer whitespace-nowrap">
                <a
                  class="text-pink-2 block h-[60px] hover:text-white no-underline leading-[3.75rem] w-min"
                  @click="scrollTo('donate'), (visible = false)"
                >
                  小額捐款</a
                >
              </dt>
              <dt class="px-5 w-min cursor-pointer whitespace-nowrap">
                <a
                  class="text-pink-2 block h-[60px] hover:text-white no-underline leading-[3.75rem] w-min"
                  @click="scrollTo('email'), (visible = false)"
                >
                  民眾服務</a
                >
              </dt>
            </nav>
          </Sidebar>
          <Button @click="visible = true"> <Icon icon="zondicons:menu" /></Button>
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="scss" scoped>
:deep(.header-dropdown) {
  @apply my-3;
  .p-button {
    @apply bg-pink-2 py-2 px-3 border-0 text-black;
    .p-button-label {
      @apply text-black whitespace-nowrap;
    }
  }
}
.p-button {
  @apply bg-transparent border-transparent p-5 my-1;
}
::-webkit-scrollbar {
  width: 0px;
  height: 4px;
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #919191;
  border-radius: 25px;
  padding: 2px;
}
</style>
<style lang="scss">
.header-drawer {
  @apply bg-gray-3;
}
</style>
