<script lang="ts" setup>
import { ref, reactive, onMounted, Ref, watch } from "vue";
import MapPanel from '@/components/vote/MapPanel.vue'
import * as echarts from "echarts";
import mapGeo from "@/assets/map/TaiwanMapGEOJSON.json";
import TaiwainCode from "@/api/json/1996/areasC.json";
import totalTickect from "@/api/json/1996/ticketsN.json";
import AreaTickect from "@/api/json/1996/ticktesC.json";

import candidateImg1 from "@/assets/images/vote/vote-01.png";
import candidateImg2 from "@/assets/images/vote/vote-02.png";
import candidateImg3 from "@/assets/images/vote/vote-03.png";
import candidateImg4 from "@/assets/images/vote/vote-04.png";

import TabMenu from "primevue/tabmenu";
import Button from "primevue/button";


let mode = ref('all') // all : 全台; area 區;
let currentIndex = ref('') // '': 沒有選區區域 ex:1-xx
const Area = ref('')
let usePanelChangCity = ref(false)
const active: Ref<number> = ref(0);
const items = ref([
  // 年份列表
  { label: "2020" },
]);


const mapPannelList: Array<any> = []
// 整理當縣市最高票候選人 strart
// @ts-ignore
const groupByCityCode = Object.groupBy(
  AreaTickect["00_000_00_000_0000"],
  // @ts-ignore
  ({ city_code }) => city_code
);
const maxTicketPercentByCity = {};
Object.keys(groupByCityCode).forEach((city_code) => {
  const candidates = groupByCityCode[city_code];
  const maxTicketPercentCandidate = candidates.reduce(
    (maxCandidate: { ticket_percent: number }, candidate: { ticket_percent: number }) => {
      return candidate.ticket_percent > maxCandidate.ticket_percent
        ? candidate
        : maxCandidate;
    },
    candidates[0]
  );
  // @ts-ignore
  maxTicketPercentByCity[city_code] = maxTicketPercentCandidate;
});
// 整理當縣市最高票候選人 end
const candidateList: Ref<Array<any>> = ref([
  {
    name: "李東載",
    img: candidateImg1,
    partyName: "腦性聯盟",
    no: 1,
    gradient: "fire-gradient",
    color: "fire-1", // 候選人代表顏色
    vote: {
      rate: 0,
      ticket: 0,
    },
  },
  {
    name: "科軌道",
    img: candidateImg2,
    partyName: "科學主義黨",
    no: 2,
    gradient: "green-gradient",
    color: "green-1",
    vote: {
      rate: 0, // 投票百分比
      ticket: 0, // 候選人得票
    },
  },
  {
    name: "河錫辰",
    img: candidateImg3,
    no: 3,
    partyName: "科學主義黨",
    gradient: "rose-gradient",
    color: "rose-1",
    vote: {
      rate: 0,
      ticket: 0,
    },
  },
  {
    name: "徐東珠",
    img: candidateImg4,
    no: 4,
    partyName: "生物進化聯盟",
    gradient: "blue-gradient",
    color: "blue-1",
    vote: {
      rate: 0,
      ticket: 0,
    },
  },
]);

// chartMap 物件
const mapContainer = ref(null);
let myChart: any = null;


watch(mode, (newMode) => {
  newMode === 'all' ? allTicket() : allAreaTicket(currentIndex.value)
})
watch(currentIndex, (newCurrentIndex) => {
  if(newCurrentIndex !== currentIndex){
    allAreaTicket(currentIndex.value)
  }
})
const groupByCityCode = Object.groupBy(AreaTickect['00_000_00_000_0000'], ({ city_code }) => city_code);
const maxTicketPercentByCity = {};
Object.keys(groupByCityCode).forEach(city_code => {
  const candidates = groupByCityCode[city_code];
  const maxTicketPercentCandidate = candidates.reduce((maxCandidate, candidate) => {
    return candidate.ticket_percent > maxCandidate.ticket_percent ? candidate : maxCandidate;
  }, candidates[0]);
  maxTicketPercentByCity[city_code] = maxTicketPercentCandidate;
});


// 產生全國票選資料給候選人
const allTicket = () => {
  // 整理當縣市最高票候選人 strart
  //  for pannel
  // console.log('產生全國票選資料給候選人')
  candidateList.value.forEach((el)=>{
    const data = totalTickect['00_000_00_000_0000'].find( area => area.cand_no === el.no
    )|| []
    el.vote['rate'] = data.ticket_percent || 0
    el.vote['ticket'] =  data.ticket_num || 0
  })
}
// 產生各地區票選資料
const allAreaTicket = ()=>{
  // console.log('產生各地區票選資料')
  candidateList.value.forEach((el)=>{
    const code = option.series[0].data[currentIndex.value]?.cityCode
    const data = AreaTickect['00_000_00_000_0000'].find( area => area.cand_no === el.no 
    && area.city_code === code)|| []
    el.vote['rate'] = parseFloat(data.ticket_percent) || parseFloat((Math.random() * 15 + 1).toFixed(2))
    el.vote['ticket'] = data.ticket_num || Math.random() * 15000 + 1
  })
}
const AllDataGetorHandler = () => {
  //  for pannel 地圖
  
  // 預設全國資料 for map
  return mapGeo.features.map((feature) => {
    mode.value === 'all' ? allTicket() : allAreaTicket()
    // 地區碼
    const cityCode = TaiwainCode['00_000_00_000_0000'].find(el=>el.area_name === feature.properties.name)?.city_code || ''
    if(cityCode !== ''){
      mapPannelList.push({
        name: feature.properties.name,
        code: cityCode,
        id: feature.properties.COUNTYID
      })
    }
    
    // 全台灣地區顏色設定
    // @ts-ignore
    const cityWinnerData = maxTicketPercentByCity[cityCode];
    const cityWinner = cityWinnerData ? cityWinnerData.cand_no : null;

    const color = setItemStyleBackgroundHandler(cityWinner);
    return {
      value: 123,
      bgColor: color,
      name: feature.properties.name,
      id: feature.properties.COUNTYID,
      zoom: feature.properties.ZOOM,
      cityCode: cityCode,
      center: feature.properties.CENTER,
      select: {
        itemStyle: {
          color: color,
        },
      },
      tooltip: {
        formatter: "{b}: {c} ({d}%)",
      },
      itemStyle: {
        normal: {
          areaColor: color,
          borderColor: "#ffffff",
          borderWidth: 1,
        },
        // 滑鼠滑到時候
        emphasis: {
          // areaColor: '#F3B329', // 高亮显示的颜色
          borderColor: "ffffff",
          borderWidth: 3,
        },
      },
    };
  });
};
// 隨機分配最高票候選人
// const getRandomInt = (max: number) => {
//   return Math.floor(Math.random() * max);
// };
const setItemStyleBackgroundHandler = (candidate: number) => {
  let bgAreaColor = "";
  switch (candidate) {
    case 1:
      bgAreaColor = "#FF0080";
      break;
    case 2:
      bgAreaColor = "#59B200";
      break;
    case 3:
      bgAreaColor = "#FF5500";
      break;
    case 4:
      bgAreaColor = "#0080FF";
      break;
    default:
      bgAreaColor = "#FF0080";
      break;
  }
  return bgAreaColor;
};
const centerCoordHandler = () => {
  // 获取当前地图中心点坐标
  let centerCoord = myChart.getOption().series[0].center;
  let currentZoom = myChart.getOption().series[0].zoom;
  // console.log("当前地图中心点坐标:", centerCoord);
  // console.log("当前地图Zoom:", currentZoom);
};

// 移動地圖 控制zoom 跟 center
const zoomAndCeterHandler = (
  zoom: number,
  center: Array<number>,
  duration = 1000,
  easing = "linear"
) => {
  myChart.setOption({
    series: [
      {
        center: center,
        zoom: zoom,
      },
    ],
    animationDuration: duration,
    animationEasing: easing,
  });
};
// 直接點擊地圖或 用mapPannel 控制
const clickSthCityHandler = async (
  params: any,
  code: any,
  outcontrl: boolean = false
) => {
  // 获取当前点击区域的中心坐标, 放大倍率
  // console.log(params)
  // console.log(params.data)
  if(params !== null && params.data.id !== ''){
    // 使用者直接點擊地圖
    Area.value = params.data.id
  }
  
  usePanelChangCity.value = false

  let zoomVaule =  null;
  let centerValue =  null;
  if ( params === null && Area.value !== '') {
    // 使用外部componet 來操作echart
    const data = JSON.parse(JSON.stringify(option.series[0].data));
    const findIndex = data.findIndex((el: { id: any }) => el.id === code);
    const findObj = data[findIndex];
    // 代替滑鼠點選地圖
    myChart.dispatchAction({
      type: "select",
      dataIndex: findIndex,
    });
    currentIndex.value = findIndex
    zoomVaule = findObj.zoom;
    centerValue = findObj.center;
    usePanelChangCity.value = true

  }else if(params !== null){
    // 直接點擊 Map
    zoomVaule = params?.data.zoom;
    centerValue = params?.data.center;
    currentIndex.value = params?.dataIndex
    Area.value = params.data.id
    mode.value = 'area'
  } 
  zoomAndCeterHandler(zoomVaule, centerValue);
};
// mapCrtol 操控資料
const pannelCotrol = (v)=>{
   if(v === ''){
    mode.value = 'all'
    myChart.dispatchAction({
          type: "unselect",
          dataIndex: currentIndex.value
        });
        currentIndex.value = ''
    return zoomAndCeterHandler(5, [2.107717973667881, -0.4230652624372137])
  }else{
    mode.value = 'area'
  }
  // console.log('v: ',v) // 對應地圖 COUNTYID; option data id;
  Area.value = v
  clickSthCityHandler(null, v, true)
}
const windowResizeHandler = () => {
  // 監聽視窗大小變化，調整地圖大小
  myChart.resize();
};
// 總統地圖 echart 資料結構

const option = reactive({
  backgroundColor: "#F5F6F8",
  // tooltip: {
  //   trigger: "item",
  //   formatter: "{b}",
  //   padding: [20, 10],
  // },
  // geo: {
  //     map: 'Taiwan',
  //     // roam: true, // 啟用縮放和拖動
  //     layoutCenter: ['30%', '180%'], // 地圖的中心位置，可根據需求調整
  //     layoutSize: '200%', // 地圖的大小，可根據需求調整
  //     zoom: 2, // 放大地圖
  //     itemStyle: {
  //       areaColor: '#00ff00',
  //       color:'#0eaf'
  //     }
  // },
  series: [
    {
      name: "台湾",
      type: "map",
      mapType: "Taiwan",
      zoom: 5,
      scaleLimit: {
        min: 2.35,
        max: 60, // 根据需求设置最大缩放倍数
      },
      center: [2.107717973667881, -0.4230652624372137],
      projection: {
        project: (point: Array<any>) => [
          (point[0] / 180) * Math.PI,
          -Math.log(Math.tan((Math.PI / 2 + (point[1] / 180) * Math.PI) / 2)),
        ],
        unproject: (point: Array<any>) => [
          (point[0] * 180) / Math.PI,
          ((2 * 180) / Math.PI) * Math.atan(Math.exp(point[1])) - 90,
        ],
      },
      roam: true,
      selectedMode: 'single', // 或 'single'
      label: {
        show: false,
        emphasis: {
          show: true,
        },
      },
      // 地區被選取到樣式
      select: {
        itemStyle: {
          // color: "pink",
          borderWidth: 4, // 修改点击地区的边框宽度
          shadowColor: "rgba(0, 0, 0, 0.65)", // 修改点击地区的阴影颜色
          shadowBlur: 15, // 修改点击地区的阴影模糊度
        },
        label: {
          show: true,
          fontSize: 20,
          textBorderColor: "#fff",
          textBorderWidth: 2,
        },
      },
      data: AllDataGetorHandler(),
    },
  ],
});

onMounted(() => {
  const taiwanGeoJson: any = mapGeo; // GeoJSON 數據匯入
  // 在此處加載台灣地圖 的 GeoJSON 數據，然後註冊地圖
  echarts.registerMap("Taiwan", taiwanGeoJson);
  // 初始化套件
  myChart = echarts.init(mapContainer.value);
  // 监听地图点击事件
  myChart.showLoading();
  myChart.on("click", clickSthCityHandler);

  // 监听地图视图变化事件
  myChart.on("globalout", centerCoordHandler);

  // 監聽地圖點擊空白處(回到預設狀態)
  myChart
    .getZr()
    .on("click", (event: any) =>{
      if (!event.target) {
        myChart.dispatchAction({
          type: "unselect",
          dataIndex: currentIndex.value
        });
        currentIndex.value = ''
        mode.value = 'all'
        return zoomAndCeterHandler(5, [2.107717973667881, -0.4230652624372137])
      }
    });
  // 畫面整體寬度有異變
  window.addEventListener("resize", windowResizeHandler);
  myChart.hideLoading();
  myChart.setOption(option);
});

</script>

<template>
  <div class="layout">
    <!-- control 面板 -->
    <MapPanel @changCity="(v)=>pannelCotrol(v)" 
      :mode="mode" :Area="Area"
      :candidateList="candidateList" :mapPannelList="mapPannelList" :usePanelChangCity="usePanelChangCity" />
    <!-- E-chart -->
    <div class="max-content mx-auto">
      <!-- 年度表 -->
      <TabMenu
        :activeIndex="active"
        class="flex justify-end"
        :label="'text-2xl'"
        :model="items"
      />
      <div class="mapContainer" ref="mapContainer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.max-content {
  max-width: 1170px;
}
.mapContainer {
  min-height: calc(95vh - 200px);
  border: 1px #e6e9ef solid;
  margin-left: 80px;
}
.layout {
  padding-inline: 80px;
}
@media screen and (max-width: 860px) {
  .mapContainer {
    margin-left: 20px;
  }
  .layout {
    padding-inline: 20px;
  }
}
:deep(.p-menuitem-link) {
  padding: 20px 24px;
}
</style>