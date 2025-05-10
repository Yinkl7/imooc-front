<script setup>
import headerSearch from './header-search/index.vue'
import headerMy from './header-my.vue'
import headerTheme from './header-theme.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToHome = () => {
  router.push({
    path: '/'
  })
}
</script>

<template>
  <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1">
    <div class="flex items-center">
      <img
        class="w-4 mr-2 cursor-pointer"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
        @click="goToHome"
      />
      <header-search class="mr-1"></header-search>
      <header-theme class="mr-1"></header-theme>
      <header-my></header-my>
    </div>
  </div>
</template>

<style scoped></style>
