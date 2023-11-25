<script setup lang="ts">
import { useToggle } from "@vueuse/core";

const [isAria, toggleAria] = useToggle();
</script>

<template>
  <header
    class="vote-header min-h-[56px] border-solid border-0 border-b border-v-ui-grey"
  >
    <div
      class="flex justify-between items-center px-6 py-3 sm:my-6 sm:px-4 sm:mx-4 md:mx-auto 2xl:mx-20 2xl:max-w-none max-w-screen-xl"
    >
      <div class="">
        <img
          class="block sm:hidden w-7 h-7"
          src="@/assets/images/vote/logo-rwd.svg"
          alt=""
        />
        <img class="hidden sm:block" src="@/assets/images/vote/logo.svg" alt="" />
      </div>
      <label for="ariaSwitch" class="text-sans flex text-sm items-center">
        <span class="text-sans mr-3">視覺輔助</span> 關<Switch
          id="ariaSwitch"
          class="header-aria-switch outline-none shadow-none"
          @click="toggleAria()"
          v-model="isAria"
        />開
      </label>
    </div>
  </header>
</template>

<style scoped lang="scss">
:deep(.header-aria-switch) {
  &.p-inputswitch {
    @apply w-8 h-4 mx-1;
    .p-inputswitch-slider {
      @apply shadow-none;
    }
    &.p-inputswitch-checked {
      .p-inputswitch-slider {
        @apply bg-fire-2;
        &::before {
          @apply translate-x-3.5;
        }
      }
    }
    .p-inputswitch-slider:before {
      @apply w-3 h-3 left-[2px] -mt-1.5;
    }
  }
}
</style>
