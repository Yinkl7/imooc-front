<script setup>
import { ref, onMounted } from 'vue'
import mButton from '../button/index.vue'

const props = defineProps({
  title: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelHandler: {
    type: Function
  },
  confirmHandler: {
    type: Function
  },
  close: {
    type: Function
  }
})

const isVisable = ref(false)

const show = () => {
  isVisable.value = true
}

onMounted(() => {
  show()
})

const duration = '0.5s'

const close = () => {
  isVisable.value = false
  setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, parseInt(duration.replace('0.', '').replace('s', '')) * 100)
}

const onCancelClick = () => {
  if(props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}

const onConfirmClick = () => {
  if(props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}
</script>

<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisable"
        @click="close"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisable"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>

        <!-- 按钮 -->
        <div class="flex justify-end">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{
            cancelText
          }}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{
            confirmText
          }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
