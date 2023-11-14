<script lang="ts" setup>
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Tooltip from 'primevue/tooltip';
import InputText from 'primevue/inputtext';
console.log(123)
import { ref } from "vue";

const navlist = ref([
  {name:'首頁', link:'#'},
  {name:'候選人主張', link:'#'},
  {name:'最新活動', link:'#'},
  {name:'政策議題', link:'#'},
  {name:'小額捐款', link:'#'},
  {name:'民眾服務', link:'#'},
])
const emaillist = ref([
  {labelName:'name',name:'您的名字', value:''},
  {labelName:'email', name:'您的Email', value:''},
  {labelName:'phone',name:'您的手機', value:''},
  {labelName:'message',name:'您的建言', value:''},
]) 
</script>

<template>
  <div class="mt-[50vh]"></div>
  <div class="mailblock bg-pink-2">
    <div class=" min-h-[30vh] justify-center  flex flex-col lg:flex-row px-12 md:px-24 py-10 md:py-20 gap-[50px]  max-w-[1420px] mx-auto">
      <div class="flex flex-col">
        <div class="text-3xl md:text-[4.5vmin] 2xl:text-6xl text-white titleBlock sw py-4 relative z-10 font-black">您的聲音，</div>
        <div class="text-3xl md:text-[4.5vmin] 2xl:text-6xl text-white titleBlock ww py-4 relative z-10 font-black mt-5">我們的行動！</div>
        <p class="py-6 px-6 text-pink-1 bg-white max-w-full lg:max-w-[420px] font-medium text-2xl rounded">
          親愛的鄉親，每一位市民的意見都是我們社區前進的原動力。<br>
          無論大小事，我都誠摯希望聽到您的建議。分享您的想法，一同為我們的未來打造更美好！
        </p>
      </div>
      <form class="flex flex-col gap-8 flex-grow md:justify-between lg:justify-around xl:justify-between">
        <div class="flex gap-2 sm:gap-5 xl:gap-[50px] flex-wrap justify-between items-center">
          <div class="text-4xl md:text-[5.5vmin] 2xl:text-8xl text-gray-3 font-black">民眾服務信箱</div>
          <Button type="submit" class="md- rounded-full bg-gray-3 border-gray-1 border-none flex-shrink-0">
            <span class="px-3 text-pink-2 text-[30px] font-black hidden md:block">送出意見</span>
              <div class="border border-pink-2 p-1.5 border-solid rounded-[100%] flex items-center justify-center flex-shrink-0">
              <Icon icon="solar:arrow-up-outline" color="#ebb2bf" width="15" height="15" class="rotate-45 "  />
            </div>
          </Button>
        </div>
        <div class="flex flex-col gap-8 ">
          
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
              <Textarea v-else v-model="value" autoResize rows="1" cols="30" :placeholder="input.name" class="w-full border border-solid border-light-2 min-h-[70] outline-none  focus:border-black" />
              <label for="input.name" class="focus:bg-white focus:px-4 focus:py-2">{{input.name}}</label>
          </span>
        </template>
        </div>
      </form>
    </div>
  </div>
  <footer class="footerContainer">
    <div class="candidateInfo title flex flex-row gap-[30px] text-white">
      <div
        class="flex-none w-[86px] h-[86px] text-[50px] flex justify-center items-center border-8 border-solid rounded-full text-white">8</div>
      <div class="font-extrabold -mt-2.5 candidateTilte">
        <div class="sm:text-2xl text-[5vmin]">2024 立委候選人</div>
        <div class="text-[16vmin] sm:text-[65px]">喵立翰</div>
      </div>
    </div>
    <ul class="candidateInfo ml-7 text-[15px] text-white font-medium">
      <li class="leading-8">辦公室地址：喵星區，毛茸茸大道88號，喵喵大樓3樓</li>
      <li class="leading-8">電話：(02) 888-5678</li>
      <li class="leading-8">電子郵件地址：meowoffice@linmeow.tw</li>
    </ul>
    <div class="candidateInfo navlist ml-auto text-[15px] flex flex-col flex-wrap">
      <div class="text-gray-3 text-[15px] flex flex-row flex-wrap">
        <div class="min-w-[118px] flex flex-col tac">
          <template v-for="(item, idx) in navlist" :key="idx">
            <a v-if="idx <= 2" :href="item.url" class="px-2 py-2 cursor-pointer">{{
              item.name
            }}</a>
          </template>
        </div>
        <div class="min-w-[118px] flex flex-col tac">
          <template v-for="(item, idx) in navlist" :key="idx">
            <a v-if="idx > 2" :href="item.url" class="px-2 py-2 cursor-pointer">{{
              item.name
            }}</a>
          </template>
        </div>
      </div>
      <div class="text-pink-2 mt-4 text-[10px] ml-6">
        © 2023 喵立翰立委候選人 版權所有
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>

.titleBlock{
  display: block;
  @apply bg-pink-1 ;
}
.sw.titleBlock{
  max-width: 450px;
  margin-left: -6rem;
  margin-right: 4.5rem;
  padding-left: 6rem;
}
.ww.titleBlock{
  max-width: 520px;
  margin-left: -6rem;
  padding-left: 6rem;
}
.titleBlock::before{
  display: block;
  color: #2B2B2B;
}

.footerContainer {
  @apply w-full inline-flex flex-wrap bg-pink-1 pl-[100px] pr-[50px] py-[50px] box-border;
}
@media screen and (max-width: 1120px) {
  .footerContainer{
    @apply px-[50px];
  }
  .candidateInfo{
    display: flex;
    justify-content: center;
  }
  .navlist.candidateInfo {
    margin-left: unset;
    justify-content: center;
    align-items: center;
  }
  .navlist.candidateInfo > .flex {
    justify-content: center;
  }
  .candidateInfo.font-medium{
    flex-direction: column;
    text-align: center;
    margin-left: unset;
  }
  .candidateInfo > .candidateTilte {
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .candidateInfo .text-pink-1-2{
    display: inline-block;
    margin: 20px auto;
  }
  .footerContainer{
    flex-direction: column;
    gap:20px;
  }
  
  .tac{
    text-align: center;
  }
}
@media screen and (max-width: 500px){
  .candidateInfo.title{
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
