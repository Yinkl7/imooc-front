<script setup>
import { randomRGB } from '@/utils/color'
import { saveAs } from 'file-saver'
import { message } from '@/libs/index'
import { useFullscreen } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number
  }
})

const handleDownload = () => {
  message('success', '图片开始下载')
  setTimeout(() => {
    saveAs(props.data.photoDownLink)
  }, 100)
}

const imgTarget = ref(null)

const { enter: onImgFullScreen } = useFullscreen(imgTarget)
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{ backgroundColor: randomRGB() }"
    >
      <!-- 图片 -->
      <img
        ref="imgTarget"
        v-lazy
        class="w-full rounded bg-transparent"
        :src="data.photo"
        alt=""
        :style="{ height: (width / data.photoWidth) * data.photoHeight + 'px' }"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full absolute top-0 left-0 bg-zinc-900/50 group-hover:opacity-100 xl:block"
      >
        <!-- 按钮 -->
        <m-button class="absolute top-1.5 left-1.5">分享</m-button>

        <!-- 点赞 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />

        <!-- 下载 -->
        <m-button
          class="absolute left-1.5 bottom-1.5 bg-zinc-100/70"
          type="info"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="handleDownload"
        />

        <!-- 全屏 -->
        <m-button
          class="absolute right-1.5 bottom-1.5 bg-zinc-100/70"
          type="info"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        />
      </div>
    </div>
    <!-- 标题 -->
    <p
      class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-200 line-clamp-2 px-1"
    >
      {{ data.title }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy class="w-2 h-2 rounded-full" :src="data.avatar" alt="" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>

<style scoped></style>
