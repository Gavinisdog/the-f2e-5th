<script lang="ts" setup></script>

<template>
  <section
    class="w-screen flex justify-between banner-wrapper lg:h-[573px] flex-col md:flex-row"
  >
    <div class="left bg-[#101313]">
      <div class="wrapper ml-6 lg:ml-24 mt-10 lg:mt-28 absolute md:relative">
        <div
          class="meow-tw text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-snug xl:leading-tight lg:leading-snug md:leading-snug font-black font-mono text-pink-2"
        >
          <div>從喵的眼中,</div>
          <div>看見台灣</div>
        </div>
        <div class="wrapper-no mt-12 flex text-white flex-col-reverse lg:flex-row w-fit ">
          <div
            class="number text-6xl border-8 border-solid rounded-full w-24 h-24 border-white flex justify-center items-center mt-5 mx-auto"
          >
            8
          </div>
          <div class="title ml-4 lg:ml-7 flex flex-col justify-between ">
            <div class="text-xl lg:text-2xl font-extrabold flex">
              <div class="lg:block hidden">2024</div>
              <div>立委候選人</div>
            </div>
            <div class="text-5xl lg:text-6xl font-black block w-fit">喵立翰</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right text-right">
      <img
        src="@/assets/images/home/home-banner.png"
        class="max-w-full md:max-w-none"
        alt=""
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner-wrapper {
  background: linear-gradient(281deg, #101313 54.12%, #d792a1 120.9%);
  @media all and (max-width: 768px) {
    background: none;
    background-color: #101313;    
  }
}
.left {
  background: linear-gradient(281deg, #101313 54.12%, #d792a1 120.9%);
  width: -webkit-fill-available;
  @media all and (max-width: 768px) {
    background: none;
    background-color: #101313;    
  }
}

</style>
