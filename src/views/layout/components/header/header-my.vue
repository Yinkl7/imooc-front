<script setup>
import icon from '@/assets/images/icon.jpg'

const typeArr = [
  {
    name: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    name: '升级VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    name: '退出登录',
    icon: 'logout',
    path: '/profile'
  }
]
</script>

<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="w-4 relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 hover:bg-zinc-100"
      >
        <!-- 头像 -->
        <img class="w-3 h-3 rounded-sm mr-0.5" :src="icon" alt="" />
        <!-- 下箭头 -->
        <m-svg-icon
          class="w-1.5 h-1.5"
          name="down-arrow"
          fillClass="fill-zinc-100"
        />
        <!-- vip 图标 -->
        <m-svg-icon
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
          name="vip"
        />
      </div>
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
