<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import * as echarts from "echarts";
import mapGeo from "@/assets/map/TaiwanMapGEOJSON.json";
import TabMenu from "primevue/tabmenu";
import Button from "primevue/button";
const active = ref(0);
const items = ref([
  { label: "2020" },
  // { label: "2016" },
  // { label: "2012" },
  // { label: "2008" },
]);

// chartMap 物件
const mapContainer = ref(null);
let myChart = null;

const dataGetorHandler = () => {
  return mapGeo.features.map((feature) => {
    const color = setItemStyleBackgroundHandler(getRandomInt(3) + 1);
    return {
      value: 123,
      bgColor: color,
      name: feature.properties.name,
      id: feature.properties.COUNTYID,
      zoom: feature.properties.ZOOM,
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
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
const setItemStyleBackgroundHandler = (candidate) => {
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
      bgAreaColor = "#ffffee";
      break;
  }
  return bgAreaColor;
};
const centerCoordHandler = () => {
  // 获取当前地图中心点坐标
  let centerCoord = myChart.getOption().series[0].center;
  let currentZoom = myChart.getOption().series[0].zoom;
  console.log("当前地图中心点坐标:", centerCoord);
  console.log("当前地图Zoom:", currentZoom);
};

// 移動地圖 控制zoom 跟 center
const zoomAndCeterHandler = (zoom, center, duration = 1000, easing = "linear") => {
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
const clickSthCityHandler = async (params, code, outcontrl = false) => {
  // 获取当前点击区域的中心坐标, 放大倍率
  // console.log(params)
  // console.log(params.data)
  let zoomVaule = params?.data.zoom || null;
  let centerValue = params?.data.center || null;
  if (outcontrl) {
    // 使用外部componet 來操作echart
    const data = JSON.parse(JSON.stringify(option.series[0].data));
    const findIndex = data.findIndex((el) => el.id === code);
    const findObj = data[findIndex];
    myChart.dispatchAction({
      type: "select",
      dataIndex: findIndex,
    });
    zoomVaule = findObj.zoom;
    centerValue = findObj.center;
  }
  zoomAndCeterHandler(zoomVaule, centerValue);
};
const windowResizeHandler = () => {
  // 監聽視窗大小變化，調整地圖大小
  myChart.resize();
};
// 總統地圖 echart 資料結構

const option = reactive({
  // title: {
  //   text: "台灣地圖 Population Estimates",
  //   left: "right",
  //   subtext: "圖片",
  // },
  // selectedMode: 'single',
  // selectedOffset: 120,
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
        project: (point) => [
          (point[0] / 180) * Math.PI,
          -Math.log(Math.tan((Math.PI / 2 + (point[1] / 180) * Math.PI) / 2)),
        ],
        unproject: (point) => [
          (point[0] * 180) / Math.PI,
          ((2 * 180) / Math.PI) * Math.atan(Math.exp(point[1])) - 90,
        ],
      },
      roam: true,
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
      // itemStyle: {
      //   normal: {
      //     areaColor: "red",
      //     borderColor: "#ffffff",
      //     borderWidth: 1,
      //   },
      //   // 滑鼠滑到時候
      //   emphasis: {
      //     // areaColor: '#F3B329', // 高亮显示的颜色
      //     borderColor: "ffffff",
      //     borderWidth: 3,
      //   },
      // },
      // data: [
      //   // 這裡可以放入你的數據
      //   // 格式為 { name: '地區名稱', value: 數據值 }

      //   // { COUNTYNAME: '新北市',COUNTYCODE:65000, value: 4822023 },
      // ]
      data: dataGetorHandler(),
    },
  ],
});

const getLeadingCandidate = (countyVotes) => {
  let leadingCandidate = "";
  let maxVotes = 0;

  // 遍历投票数据，找到得票最多的候選人
  for (const candidate in countyVotes) {
    if (countyVotes[candidate] > maxVotes) {
      maxVotes = countyVotes[candidate];
      leadingCandidate = candidate;
    }
  }

  return leadingCandidate;
};

onMounted(() => {
  const taiwanGeoJson = mapGeo; // GeoJSON 數據匯入
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
    .on("click", (event) =>
      !event.target
        ? zoomAndCeterHandler(5, [2.107717973667881, -0.4230652624372137])
        : () => {}
    );
  // 畫面整體寬度有異變
  window.addEventListener("resize", windowResizeHandler);
  myChart.hideLoading();
  myChart.setOption(option);
});

watch(option, (newValue, oldValue) => {});
</script>

<template>
  <div class="layout">
    <div class="flex flex-row gap-3">
      <Button label="高雄市" @click="clickSthCityHandler(null, 'E', true)" />
      <Button label="臺南市" @click="clickSthCityHandler(null, 'D', true)" />
      <Button label="嘉義縣" @click="clickSthCityHandler(null, 'Q', true)" />
    </div>
    <TabMenu
      v-model:activeIndex="active"
      class="flex justify-end"
      :label="'text-2xl'"
      :model="items"
    ></TabMenu>
    <div ref="mapContainer" class="mapContainer"></div>
  </div>
</template>

<style lang="scss" scoped>
.mapContainer {
  max-width: 1170px;
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


<!-- 明天務必討論一下
1.問題處
2.資料結構 候選人 新北縣式資料
3.展示功能
4.compont 控制 echart
5.處理 echart 回傳給 componet 響應式資料 -->