<script setup>
import { computed } from 'vue'
import { THTME_DARK, THTME_LIGHT, THTME_SYSTEM } from '@/constants'
import { useStore } from 'vuex'

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

const store = useStore()

const themeClick = (item) => {
  store.commit('theme/changeThemeType', item.type)
}

const themeSvg = computed(() => {
  const theme = typeArr.find((item) => item.type === store.getters.themeType)
  return theme?.icon
})
</script>

<template>
  <m-popover placement="bottom-left">
    <template #reference>
      <m-svg-icon
        :name="themeSvg"
        class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-200 dark:hover:bg-zinx-900 guide-theme"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in typeArr"
        :key="item.type"
        @click="themeClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <span class="text-zinc-900 dark:text-zinc-300 text-sm">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<style scoped></style>
