<template>
  <span>{{ parseInt(d.toFixed(0)).toLocaleString() }}</span>
</template>

<script setup>
import gsap from "gsap";
import { ref, watch, onMounted, defineProps } from "vue";

const props = defineProps(["value", "timeSpeed"]);

const d = ref(0);
const duration = props.timeSpeed ?? 1;
const AnimationToValue = () => {
  gsap.to(d, { duration: duration, value: props.value });
};

// 初始化时执行动画
onMounted(() => {
  AnimationToValue();
});

// 监听 props.value 的变化，触发动画
watch(
  () => props.value,
  () => {
    AnimationToValue();
  }
);
</script>

<style lang="scss" scoped></style>
