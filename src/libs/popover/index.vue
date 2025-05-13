<script>
const DELAY_TIME = 100
const TOP_LEFT = 'top-left'
const TOP_RIGHT = 'top-right'
const BOTTOM_LEFT = 'bottom-left'
const BOTTOM_RIGHT = 'bottom-right'

const placementEnum = [TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT]
</script>

<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: TOP_LEFT,
    validator(val) {
      let res = placementEnum.includes(val)
      if (!res) {
        throw new Error(`placement 必须是 ${placementEnum.join('、')} 中的一个`)
      }
      return res
    }
  }
})

const isVisible = ref(false)

let time = null

const handleMouseEnter = () => {
  isVisible.value = true
  if (time) {
    clearTimeout(time)
    time = null
  }
}

const handleMouseLeave = () => {
  time = setTimeout(() => {
    isVisible.value = false
    time = null
  }, DELAY_TIME)
}

const headerContentRef = ref(null)

const mainContentRef = ref(null)

const getElementInfo = (target) => {
  if (!target) return
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

const mainContentStyle = ref({
  top: '0px',
  left: '0px'
})

watch(isVisible, (val) => {
  if (val) {
    nextTick(() => {
      switch (props.placement) {
        case TOP_LEFT:
          mainContentStyle.value.top = '0px'
          mainContentStyle.value.left = `${-getElementInfo(mainContentRef.value)
            .width}px`
          break
        case TOP_RIGHT:
          mainContentStyle.value.top = '0px'
          mainContentStyle.value.left = `${
            getElementInfo(headerContentRef.value).width
          }px`
          break
        case BOTTOM_LEFT:
          mainContentStyle.value.top = `${
            getElementInfo(headerContentRef.value).width
          }px`
          mainContentStyle.value.left = `${-getElementInfo(mainContentRef.value)
            .width}px`
          break
        case BOTTOM_RIGHT:
          mainContentStyle.value.top = `${
            getElementInfo(headerContentRef.value).width
          }px`
          mainContentStyle.value.left = `${
            getElementInfo(headerContentRef.value).width
          }px`
          break
      }
    })
  }
})
</script>

<template>
  <div
    class="relative"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div ref="headerContentRef">
      <!-- 触发内容 -->
      <slot name="reference" />
    </div>
    <Transition name="slider">
      <div
        v-show="isVisible"
        class="absolute z-20 p-1 bg-white border-2 border-zinc-200 rounded-md"
        ref="mainContentRef"
        :style="mainContentStyle"
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
