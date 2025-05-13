<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile/index.vue'
import { useStore } from 'vuex'

const store = useStore()

store.dispatch('category/getCategoryData')
</script>

<template>
  <mobile-navigation v-if="isMobileTerminal" />
</template>

<style scoped></style>
