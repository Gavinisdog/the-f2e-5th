<script lang="ts" setup>
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
</script>

<template>
  <div class="mt-[50vh]"></div>
  <div class="mailblock"></div>
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
    <div class="candidateInfo navlist ml-auto text-black text-[15px] flex flex-col flex-wrap">
      <div class="text-black text-[15px] flex flex-row flex-wrap">
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
      <div class="text-lightpink mt-4 text-[10px] ml-6">
        © 2023 喵立翰立委候選人 版權所有
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footerContainer {
  @apply w-full inline-flex flex-wrap bg-pink pl-[100px] pr-[50px] py-[50px] box-border;
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
  .candidateInfo .text-lightpink{
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
