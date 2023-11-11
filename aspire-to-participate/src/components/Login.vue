<script>
import { Icon } from "@iconify/vue";
</script>
<template>
  <div class="header-navlist w-full">
    <router-link
      to="/F2E/Site"
      class="text-amber-600 border bg-yellow-400 rounded-xl border-solid border-rose-100 mx-3"
    >
      <p class="flex justify-center items-center">
        立委競選官網
        <Icon
          icon="fluent-mdl2:live-site"
          width="20"
          :horizontalFlip="true"
          :verticalFlip="true"
        />
      </p>
    </router-link>
    <router-link
      to="/F2E/Map"
      class="text-amber-600 border bg-yellow-400 rounded-xl border-solid border-rose-100 mx-3"
    >
      <p class="flex justify-center items-center">
        總統即時開票全台地圖<Icon
          icon="carbon:map"
          width="20"
          :horizontalFlip="true"
          :verticalFlip="true"
        />
      </p>
    </router-link>
  </div>
  <div>
    <!-- <Icon icon="mdi:home" :iconStyle="{ fontSize: '24px', color: 'blue' }" /> -->
  </div>
</template>
<style lang="scss" scoped>
.header-navlist {
  display: flex;
  height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.header-navlist a {
  text-align: center;
  flex: 1 0 50%;
}
</style>
