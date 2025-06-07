<script setup>
import icon from '@/assets/images/icon.jpg'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm } from '@/libs/confirm'

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
    path: ''
  }
]

const router = useRouter()
// 跳转到登录
const handleToLogin = () => {
  router.push('/login')
}

const store = useStore()

const handleItemClick = (path) => {
  if (path) {
    router.push(path)
    return
  }
  confirm('您确定要退出登录吗？').then(() => {
    store.dispatch('user/logout')
  })
}
</script>

<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        v-if="$store.getters.userInfo.avatar"
        class="w-4 relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 hover:bg-zinc-100 guide-my"
      >
        <!-- 头像 -->
        <img v-lazy class="w-3 h-3 rounded-sm mr-0.5" :src="icon" alt="" />
        <!-- 下箭头 -->
        <m-svg-icon
          class="w-1.5 h-1.5"
          name="down-arrow"
          fillClass="fill-zinc-100"
        />
        <!-- vip 图标 -->
        <m-svg-icon
          v-if="$store.getters.userInfo.vipLevel"
          class="w-1.5 h-1.5 absolute right-[22px] bottom-0"
          name="vip"
        />
      </div>
      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="handleToLogin"
        >
        </m-button>
      </div>
    </template>

    <div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in typeArr"
        :key="item.type"
        @click="handleItemClick(item.path)"
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
