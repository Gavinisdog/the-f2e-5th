<script lang="ts" setup>
import Dropdown from 'primevue/dropdown';
import ProgressBar from 'primevue/progressbar';
import Badge from 'primevue/badge';
import candidateImg1 from "@/assets/images/vote/vote-01.png";
import candidateImg2 from "@/assets/images/vote/vote-02.png";
import candidateImg3 from "@/assets/images/vote/vote-03.png";
import candidateImg4 from "@/assets/images/vote/vote-04.png";
import ticketsNational1996 from "@/api/json/1996/ticketsN.json";

const props = defineProps(['candidateList'])

</script>
<template>
  <div class="control-Pannel fixed z-50 w-full max-w-[300px]">
    <div class="DropdownList flex gap-1 flex-row bg-rose-1 p-4">
    <label for="city" class="flex-grow px-1">
      <select id="city" name="cars" class="bg-rose-1 border-none text-white w-full flex text-lg max-w-[86px]" placeholder="縣市">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
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
    <div class="candidate-blocks bg-white shadow-ex p-4">
      <div v-for="candidator in props.candidateList" class="my-2">
        <div :class="`text-white bg-${candidator.color} inline-block px-2 py-1 text-[10px] rounded-[99px] font-bold mb-1`">{{candidator.partyName}}</div>
        <div 
          class="flex flex-row gap-1 items-center"
        >
          <div 
            class="tag border-[3px] border-solid w-6 h-6 rounded-[100%] flex-shrink-0 flex justify-center items-center"
            :class="`border-${candidator.color}`"
          >
            <span :class="`text-${candidator.color} font-bold text-xl`">{{candidator.no}}</span>
          </div>
          <div class="text-lg font-bold text-v-dark">{{candidator.name}}</div>
          <div class="flex-grow ml-6">
            <div class="flex justify-between text-v-dark text-[14px]"><span>{{candidator.vote.rate}}%</span><span>{{candidator.vote.ticket.toLocaleString()}}</span></div>
            <ProgressBar :value="candidator.vote.rate" class="flex-grow text-center h-4" style="height: 6px"></ProgressBar>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.shadow-ex{
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.10);
}
.control-Pannel{
  max-width: 328px;
}
:deep(.p-progressbar-label){
  color: transparent
}
</style>