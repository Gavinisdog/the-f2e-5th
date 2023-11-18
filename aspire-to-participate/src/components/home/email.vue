<script setup lang="ts">
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Tooltip from "primevue/tooltip";
import InputText from "primevue/inputtext";
import { ref, computed } from "vue";

const emaillist = ref([
  { labelName: "name", name: "您的名字", value: "" },
  { labelName: "email", name: "您的Email", value: "" },
  { labelName: "phone", name: "您的手機", value: "" },
  { labelName: "message", name: "您的建言", value: "" },
]);
</script>
<template>
  <div class="mailblock bg-pink-2">
    <div
      class="min-h-[30vh] justify-center flex flex-col lg:flex-row px-12 md:px-24 py-10 md:py-20 gap-[50px] max-w-[1420px] mx-auto"
    >
      <div class="flex flex-col">
        <div
          class="text-3xl md:text-[4.5vmin] 2xl:text-6xl text-white titleBlock sw py-4 relative z-10 font-black"
        >
          您的聲音，
        </div>
        <div
          class="text-3xl md:text-[4.5vmin] 2xl:text-6xl text-white titleBlock ww py-4 relative z-10 font-black mt-5"
        >
          我們的行動！
        </div>
        <p
          class="py-6 px-6 text-pink-1 bg-white max-w-full lg:max-w-[420px] font-medium text-2xl rounded"
        >
          親愛的鄉親，每一位市民的意見都是我們社區前進的原動力。<br />
          無論大小事，我都誠摯希望聽到您的建議。分享您的想法，一同為我們的未來打造更美好！
        </p>
      </div>
      <form
        class="flex flex-col gap-8 flex-grow md:justify-between lg:justify-around xl:justify-between"
      >
        <div
          class="flex gap-2 sm:gap-5 xl:gap-[50px] flex-wrap justify-between items-center"
        >
          <div class="text-4xl md:text-[5.5vmin] xl:text-[50px] 2xl:text-8xl text-gray-3 font-black">
            民眾服務信箱
          </div>
          <Button
            type="submit"
            class="bg-gray-3 border-gray-1 border-none flex-shrink-0"
            rounded
            raised
          >
            <span class="px-3 text-pink-2 text-[30px] font-black hidden md:block"
              >送出意見</span
            >
            <div
              class="border border-pink-2 p-1.5 border-solid rounded-[100%] flex items-center justify-center flex-shrink-0"
            >
              <Icon
                icon="solar:arrow-up-outline"
                color="#ebb2bf"
                width="15"
                height="15"
                class="rotate-45"
              />
            </div>
          </Button>
        </div>
        <div class="flex flex-col gap-8">
          <template v-for="input in emaillist" :key="input.labelName">
            <span class="p-float-label">
              <InputText
                v-if="input.labelName !== 'message'"
                v-model="input.value"
                v-tooltip.top="`請輸入 ${input.name}`"
                :id="input.name"
                :placeholder="input.name"
                class="w-full border border-solid border-light-2 min-h-[70] outline-none focus:border-black"
              />
              <Textarea
                v-else
                v-model="value"
                autoResize
                rows="1"
                cols="30"
                :placeholder="input.name"
                class="w-full border border-solid border-light-2 min-h-[70] outline-none focus:border-black"
              />
              <label for="input.name" class="focus:bg-white focus:px-4 focus:py-2">{{
                input.name
              }}</label>
            </span>
          </template>
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.titleBlock {
  display: block;
  @apply bg-pink-1;
}
.sw.titleBlock {
  max-width: 450px;
  margin-left: -6rem;
  margin-right: 4.5rem;
  padding-left: 6rem;
}
.ww.titleBlock {
  max-width: 520px;
  margin-left: -6rem;
  padding-left: 6rem;
}
.titleBlock::before {
  display: block;
  color: #2b2b2b;
}
</style>
