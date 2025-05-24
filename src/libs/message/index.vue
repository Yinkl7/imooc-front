<script>
const typeEnum = ['warn', 'error', 'success']
</script>

<script setup>
import { onMounted, ref } from 'vue'
import mSvgIcon from '../svg-icon/index.vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val)
      if (!result) {
        throw new Error(`type 必须为 ${typeEnum.join('、')} 中的一个`)
      }
      return result
    }
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    type: Number
  },
  destory: {
    type: Function
  }
})

const styles = {
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200 hover:shodow-lg hover:shadow-warn-100'
  },
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200 hover:shodow-lg hover:shadow-error-100'
  },
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200 hover:shodow-lg hover:shadow-success-100'
  }
}

const isVisible = ref(true)

onMounted(() => {
  isVisible.value = true

  setTimeout(() => {
    isVisible.value = false
  }, props.duration)
})
</script>

<template>
  <transition name="down" @after-leave="destory">
    <div
      v-show="isVisible"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer duration-300"
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="w-1.5 h-1.5 mr-1.5"
      />

      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </transition>
</template>

<style scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
