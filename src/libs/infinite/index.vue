<script setup>
import { ref, watch } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  isFinished: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'onLoad'])

const loading = useVModel(props, 'modelValue')

const loadingTargetRef = ref()

const targetIsIntersecting = ref(false)

useIntersectionObserver(loadingTargetRef, ([{ isIntersecting }]) => {
  // if (isIntersecting && !loading.value && !props.isFinished) {
  //   loading.value = true
  //   emits('onLoad')
  // }
  targetIsIntersecting.value = isIntersecting
  emitLoading()
})

const emitLoading = () => {
  if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
    loading.value = true
    emits('onLoad')
  }
}

watch(loading, () => {
  // 防止第一次加载完数据还没渲染就开始第二次加载数据
  setTimeout(() => {
    emitLoading()
  }, 100)
})
</script>

<template>
  <div>
    <!-- 内容区域 -->
    <slot />

    <div ref="loadingTargetRef">
      <m-svg-icon
        v-show="loading"
        name="infinite-load"
        class="w-4 h-4 mx-auto animate-spin"
      />
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        没有更多内容了
      </p>
    </div>
  </div>
</template>

<style scoped></style>
