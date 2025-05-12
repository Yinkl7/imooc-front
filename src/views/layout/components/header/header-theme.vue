<script setup>
import { THTME_DARK, THTME_LIGHT, THTME_SYSTEM } from '@/constants'

const typeArr = [
  {
    name: '极简白',
    icon: 'theme-light',
    type: THTME_LIGHT
  },
  {
    name: '极夜黑',
    icon: 'theme-dark',
    type: THTME_DARK
  },
  {
    name: '跟随系统',
    icon: 'theme-system',
    type: THTME_SYSTEM
  }
]
</script>

<template>
  <m-popover>
    <template #reference>
      <m-svg-icon
        name="theme-light"
        class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-200"
        fillClass="fill-zinc-900"
      ></m-svg-icon>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in typeArr"
        :key="item.type"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900"
        />
        <span class="text-zinc-900 text-sm">{{ item.name }}</span>
      </div>
    </div>
  </m-popover>
</template>

<style scoped></style>
