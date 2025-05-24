<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { onMounted } from 'vue'

let driverObj = null
onMounted(() => {
  driverObj = driver({
    showProgress: true,
    animate: false,
    showProgress: false,
    showButtons: ['next', 'previous', 'close'],
    prevBtnText: '上一步',
    nextBtnText: '下一步',
    doneBtnText: '完成',
    steps: [
      {
        element: '.guide-home',
        popover: {
          title: 'logo',
          description: '点击可返回首页'
        }
      },
      {
        element: '.guide-search',
        popover: {
          title: '搜索',
          description: '搜索您期望的图片'
        }
      },
      {
        element: '.guide-theme',
        popover: {
          title: '风格',
          description: '选择一个您喜欢的风格'
        }
      },
      {
        element: '.guide-my',
        popover: {
          title: '账户',
          description: '这里标记了您的账户信息'
        }
      },
      {
        element: '.guide-start',
        popover: {
          title: '引导',
          description: '这里可以再次查看引导信息',
          side: 'left'
        }
      },
      {
        element: '.guide-feedback',
        popover: {
          title: '引导',
          description: '这里可以再次查看引导信息',
          side: 'left'
        }
      }
    ]
  })

  // driverObj.drive()
})

const handleNavClick = () => {
  driverObj && driverObj.drive()
}
</script>

<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <div
      class="w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2 guide-start"
        fillClass=" fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
        @click="handleNavClick"
      ></m-svg-icon>
    </div>
    <!-- 反馈 -->
    <m-popover class="flex items-center" placement="top-left">
      <template #reference>
        <div
          class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
        >
          <m-svg-icon
            name="feedback"
            class="w-2 h-2 guide-feedback"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
          ></m-svg-icon>
        </div>
      </template>

      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <m-svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm"></span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<style scoped></style>
