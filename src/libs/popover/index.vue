<script setup>
import { ref } from 'vue'

const isVisible = ref(false)

const handleMouseEnter = () => {
  isVisible.value = true
}

const handleMouseLeave = () => {
  isVisible.value = false
}
</script>

<template>
  <div
    class="relative"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div>
      <!-- 触发内容 -->
      <slot name="reference" />
    </div>
    <Transition name="slider">
      <div
        v-show="isVisible"
        class="absolute z-20 p-1 bg-white border-2 border-zinc-200 rounded-md"
      >
        <!-- 弹出内容 -->
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.slider-enter-active,
.slider-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slider-enter-from,
.slider-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
