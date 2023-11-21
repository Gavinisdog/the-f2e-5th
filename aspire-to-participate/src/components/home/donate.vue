<script lang="ts" setup>
// 確認
// import Checkbox from 'primevue/checkbox';
import Button from "primevue/button";

// 載入圖片功能
import Image from "primevue/image";
import imagePath from "@/assets/images/home/donation01.png";
import ScrollPanel from "primevue/scrollpanel";
// 確認
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import { ref, computed, watch } from "vue";
import AnimationToValue from "@/components/home/AnimationToValue.vue";

const confirm = useConfirm();
const toast = useToast();
const donateBlock = ref([
  { title: "喵星人之友1", price: 300, conunt: 100, isDonate: false, isChecked: false },
  { title: "喵星大使2", price: 500, conunt: 800, isDonate: false, isChecked: false },
  { title: "喵物精選3", price: 750, conunt: 50, isDonate: false, isChecked: false },
  { title: "喵星人之友4", price: 300, conunt: 100, isDonate: false, isChecked: false },
  { title: "喵星大使5", price: 500, conunt: 800, isDonate: false, isChecked: false },
  { title: "喵物精選6", price: 750, conunt: 50, isDonate: false, isChecked: false },
]);

const choosenDonate = computed(() => {
  return donateBlock.value
    .filter((item) => item.isChecked)
    .reduce((acc, curr) => {
      return acc + curr.title + ", ";
    }, "");
});

watch(donateBlock, (newDonateBlock, oldDonateBlock) => {
  newDonateBlock.forEach((newItem, index) => {
    const oldItem = oldDonateBlock[index];
    if (newItem.isDonate !== oldItem.isDonate) {
      choosenDonate.value;
    }
  });
});

const totalPrice = computed(() => {
  const price = donateBlock.value.reduce((acc, curr) => {
    return acc + curr.price * curr.conunt;
  }, 0);
  return price;
});
const donateHandler = async () => {
  const checkedItems = donateBlock.value.filter((item) => item.isChecked);
  if (checkedItems.length === 0) return alert("請選擇捐獻方案");
  confirm.require({
    message: `您是否要送出捐獻申請`,
    header: "捐贈意願申請",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      console.log(checkedItems);

      for (const item of checkedItems) {
        console.log(item);
        // 如果原本是 false，设为 true；如果原本是 true，设为 false
        item.isDonate = !item.isDonate;
        if (item.isDonate) item.conunt++;
        else item.conunt--;

        toast.add({
          severity: "success",
          summary: `${item.title}募捐方案`,
          detail: `完成您${item.isDonate ? "捐獻" : "放棄"}的需求`,
          life: 3000,
        });
      }

      // 异步操作完成后重置 isChecked
      donateBlock.value.forEach((item) => (item.isChecked = false));
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: `募捐方案`,
        detail: "您已經放棄本次項目操作",
        life: 3000,
      });
    },
  });
};
</script>

<template>
  <div>
    <Toast />
    <ConfirmDialog id="confirm" aria-label="popup"></ConfirmDialog>
    <div class="title-wrapper py-12 px-6 md:px-12 lg:px-24 bg-gray-3">
      <div class="title-inner text-pink-2 text-5xl font-black">小額捐款</div>
    </div>
    <div class="donateBlock bg-gray-3 md:px-5 pb-[140px] pt-0 overflow-hidden">
      <div
        class="flex flex-col px-5 md:flex-row gap-6 md:gap-[50px] items-end flex-nowrap md:flex-wrap justify-center"
      >
        <div class="flex flex-col gap-5 md:gap-[45px] mx-auto md:mx-[unset]">
          <!-- <div class="text-4xl md:text-[50px] text-pink-2 font-black"></div> -->
          <div class="relative">
            <div
              class="px-5 font-black rounded-sm py-2.5 text-[50px] bg-pink-2 text-white absolute z-50 -top-[20%] -right-[20%] ab-title1 transition-all duration-500"
            >
              您的小筆捐款，
            </div>
            <div
              class="px-5 font-black rounded-sm py-2.5 text-[50px] bg-pink-2 text-white absolute z-50 top-[0%] -right-3/4 ab-title2 transition-all duration-500"
            >
              是每隻毛孩未來的大大動力！
            </div>
            <div
              class="w-4/5 md:w-full max-w-[528px] mx-auto rounded-3xl border-[10px] border-solid border-pink-2 overflow-hidden aspect-square"
            >
              <Image
                :src="imagePath"
                :pt="{
                  previewContainer: {
                    class: 'flex item-center justify-center ',
                  },
                  image: {
                    class: 'w-full max-w-[528px]',
                  },
                }"
                preview
                alt="小額捐款"
              />
            </div>
          </div>
          <Button
            type="submit"
            class="mtBtn flex bg-pink-1 border-gray-1 border-none flex-shrink-0 self-center hover:bg-pink-2"
            rounded
            raised
            @click="donateHandler()"
            label="Confirm"
            id="confirmButton"
          >
            <span
              class="px-1 py-1 sm:px-3 sm:py-2 text-white sm:text-[5vmin] font-black flex text-3xl"
              >前往捐款</span
            >
            <div
              class="border-3 border-white p-1.5 border-solid rounded-[100%] flex items-center justify-center flex-shrink-0"
            >
              <Icon
                icon="solar:arrow-up-outline"
                color="#ffffff"
                width="20"
                height="20"
                class="rotate-45"
              />
            </div>
          </Button>
        </div>
        <div
          class="w-4/5 md:w-full max-w-[400px] mx-auto md:mx-[unset] md:flex-grow md:max-w-xl cursor-pointer"
        >
          <div
            class="text-white text-2xl font-black flex flex-row flex-wrap items-center"
          >
            選擇捐款方案:
            <span class="text-pink-2" v-show="donateBlock.find((el) => el.isChecked)"
              >您目前選擇的方案為{{ choosenDonate }}</span
            >
          </div>

          <ScrollPanel
            class="donateContainer my-9"
            :pt="{
              root: {
                style: { overflow: 'hidden' },
                class: 'pr-0 flex-grow',
              },
              barX: { class: 'bg-white w-2.5 h-[8px] shadow-sm' },
              content: {
                class: 'flex flex-row gap-6 pr-0 py-4',
              },
            }"
          >
            <div v-for="(item, idx) in donateBlock" :key="idx">
              <label
                :for="item.title"
                class="min-w-[252px] pb-6 flex-shrink-0 bg-white rounded-3xl text-center overflow-hidden aspect-square hover:shadow-inner hover:-translate-y-3 transition duration-300"
              >
                <div
                  class="p-6 bg-pink-2 text-2xl font-black text-white flex flex-row justify-center items-center gap-1"
                >
                  {{ item.title }}
                  <Checkbox
                    class="hidden"
                    :inputId="item.title"
                    v-model="item.isChecked"
                    :binary="true"
                  />
                </div>
                <div class="px-6 py-3 text-center text-pink-2">
                  <div class="text-base">
                    捐款新台幣<span class="font-black">{{ item.price }}</span
                    >元
                  </div>
                  <div class="text-lg">已有</div>
                  <div
                    class="text-transparent text-stroke text-[50px] md:text-[70px] font-black -my-1.5 flex flex-row items-center justify-center gap-2 relative"
                  >
                    <AnimationToValue :value="item.conunt" />
                    <Icon
                      v-if="item.isDonate"
                      icon="line-md:confirm-circle"
                      color="#008640"
                      width="30"
                      height="30"
                      class="mt-4 absolute right-0 top-1/2 -translate-y-1/2"
                    />
                  </div>
                  <div class="text-lg">人贊助</div>
                </div>
              </label>
            </div>
          </ScrollPanel>
          <div class="text-pink-2 font-black">
            <div class="text-2xl text-center md:text-left">目前小額贊助總金額：</div>
            <div class="text-center md:text-left text-[40px] md:text-[70px]">
              <AnimationToValue :value="totalPrice" /> 元
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.text-stroke {
  font-weight: 900;
  -webkit-text-stroke: 4px #ebb2bf;
}
@media screen and (max-width: 1252px) {
  .ab-title1 {
    right: unset;
    left: 0px;
    top: 0%;
    font-size: 3.85vmin;
    text-align: center;
  }
  .ab-title2 {
    top: unset;
    right: unset;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    width: max(calc(155% - 30vh), 150px);
    // max-width: 700px;
    font-size: 4.25vmin;
    text-align: center;
  }
  .mtBtn {
    // margin-top: 5vmin;
  }
}
@media screen and (max-width: 385px) {
  .ab-title2 {
    display: none;
  }
  .mtBtn {
    // margin-top: 0px;
  }
}
</style>
