<script setup>
/**
 * 1、添加到body元素中
 * 2、包含蒙版和内容展示
 * 3、双向绑定显示隐藏 不要绑定在最外层
 * 4、锁定滚动
 * 5、内容区域接收所有的attrs，通过插槽展示内容
 */
import { useScrollLock } from '@vueuse/core'
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const isLocked = useScrollLock(document.body)
watch(
  () => props.modelValue,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>

<template>
  <Teleport to="body">
    <!-- 蒙版 -->
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed top-0 left-0 bg-zinc-900/80 w-screen h-screen z-40"
        @click="emits('update:modelValue', false)"
      ></div>
    </Transition>

    <Transition name="popup-up-down">
      <div
        v-if="modelValue"
        v-bind="$attrs"
        class="fixed bottom-0 w-screen z-50 bg-white"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-up-down-leave-active,
.popup-up-down-enter-active {
  transition: all 0.3s;
}

.popup-up-down-leave-to,
.popup-up-down-enter-from {
  transform: translateY(100%);
}
</style>
