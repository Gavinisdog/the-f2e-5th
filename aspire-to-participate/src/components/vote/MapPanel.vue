<script lang="ts" setup>
import ProgressBar from "primevue/progressbar";

import Button from "primevue/button";

import { ref, defineEmits, watch } from "vue";

const props = defineProps([
  "candidateList",
  "mapPannelList",
  "usePanelChangCity",
  "Area",
  "mode",
]);
const selectedCity = ref("");
const emit = defineEmits(["changCity"]);
const emitSelectedOption = () => {
  // 發送選中的選項到父組件或其他需要的地方
  // console.log(e, selectedCity.value)
  emit("changCity", selectedCity.value);
};
const resetSelct = () => {
  selectedCity.value = "";
  emit("changCity", "");
};

// watch(props.mode, (newMode) => {
//   selectedCity.value = newMode === 'all' ? '' : Area.value;
//   console.log(selectedCity.value)
// });
watch(props.mode, (newMode) => {
  console.log(newMode);
  if (newMode !== undefined) {
    // @ts-ignore
    selectedCity.value = newMode === "all" ? "" : props.Area.value;
    console.log(selectedCity.value);
  }
});
</script>
<template>
  <div
    class="control-Pannel fixed top-[90px] left-[5%] z-50 w-full max-w-[300px] shadow-ex"
  >
    <div class="DropdownList flex gap-1 flex-row bg-rose-1 p-4">
      <label for="city" class="flex flex-row justify-between w-full flex-grow px-1">
        <select
          v-model="selectedCity"
          @change="emitSelectedOption"
          id="city"
          name="cars"
          class="bg-rose-1 border-none text-white w-full flex text-lg max-w-[86px]"
          placeholder="縣市"
        >
          <option value="" disabled>請選擇</option>
          <option :value="area.id" v-for="area in mapPannelList" :key="area.code">
            {{ area.name }}
          </option>
        </select>
        <Button
          label="重新設定"
          @click="resetSelct"
          severity="success"
          size="small"
          text
          raised
          rounded
          outlined
          class="text-white flex-shrink-0 bg-fire-1"
        >
        </Button>
      </label>
      <!-- <label for="city" class="flex-grow px-1">
      <select id="city" name="cars" class="bg-rose-1 border-none text-white w-full flex text-lg" placeholder="縣市">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
    </label>
    <label for="city" class="flex-grow px-1">
      <select id="city" name="cars" class="bg-rose-1 border-none text-white w-full flex text-lg" placeholder="縣市">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
    </label> -->
    </div>
    <div class="candidate-blocks bg-white p-4">
      <div v-for="(candidator, index) in props.candidateList" class="my-2" :key="index">
        <div
          :class="`text-white bg-${candidator.color} inline-block px-2 py-1 text-[10px] rounded-[99px] font-bold mb-1`"
        >
          {{ candidator.partyName }}
        </div>
        <div class="flex flex-row gap-1 items-center">
          {{ candidator.partyName }}
        </div>
        <div class="flex flex-row gap-1 items-center">
          <div
            class="tag border-[3px] border-solid w-6 h-6 rounded-[100%] flex-shrink-0 flex justify-center items-center"
            :class="`border-${candidator.color}`"
          >
            <span :class="`text-${candidator.color} font-bold text-xl`">{{
              candidator.no
            }}</span>
          </div>
          <div class="text-lg font-bold text-v-dark">{{ candidator.name }}</div>
          <div class="flex-grow ml-6">
            <div class="flex justify-between text-v-dark text-[14px]">
              <span>{{ candidator.vote.rate }}%</span
              ><span>{{ candidator.vote.ticket.toLocaleString() }}</span>
            </div>
            <ProgressBar
              :value="candidator.vote.rate"
              class="flex-grow text-center h-4"
              style="height: 6px"
            ></ProgressBar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.shadow-ex {
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
}
.control-Pannel {
  max-width: 328px;
}
:deep(.p-progressbar-label) {
  color: transparent;
}
</style>
