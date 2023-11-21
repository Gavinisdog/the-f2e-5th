<script lang="ts" setup>
// import * as echarts from 'echarts';
// import { ref, onMounted } from 'vue';

// const chartRef = ref(null)
// onMounted(() => {
//   const myChart = echarts.init(chartRef.value);
//   myChart.setOption({

//      legend: {
//       // Try 'horizontal'
//       orient: 'horizontal',
//       right: 10,
//       top: 'center',
//       // data: ['image://https://picsum.photos/200/300', 'bar','circle','circle','circle']
//     },
//     title: {
//       text: 'ECharts 入门示例'
//     },
//     icon: 'rect',
//     backgroundColor: '#00ff00',
//     // tooltip: {},
//     xAxis: {
//       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//     },
//     yAxis: {},
//     series: [
//       {
//         name: '销量',
//         type: 'bar',
//         data: [{
//           value:99,
//           symbol: 'image://' + 'https://picsum.photos/200/300',
//         }, 20, 36, 10, 10, 20]
//       }
//     ]
//   });
// });

import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

const chart = ref(null);
let chartInstance: any = null;

const renderChart = () => {
  chartInstance = echarts.init(chart.value);

  // 定义图表数据
  const option = {
    title: {
      text: "示例图表",
    },
    xAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "示例数据",
        type: "bar",
        data: [5, 10, 15, 20, 25],
      },
    ],
  };

  // 使用 setOption 方法设置图表数据
  chartInstance.setOption(option);
};

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

onMounted(() => {
  // 创建 ECharts 实例并初始化
  renderChart();

  // 在窗口大小变化时重新调整图表大小
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  // 移除窗口大小变化的事件监听以避免内存泄漏
  window.removeEventListener("resize", resizeChart);
});
</script>

<template>
  <!-- map pluin: -->

  <!-- <div class="chartRef" ref="chartRef"></div> -->
  <div class="chartRef" ref="chart"></div>
</template>
<style lang="scss" scoped>
.chartRef {
  width: 100vw;
  height: 80vh;
}
</style>
