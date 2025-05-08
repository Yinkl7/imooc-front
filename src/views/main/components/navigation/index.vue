<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile/index.vue'
import { getCategory } from '@/api/category'

const categorysData = ref([])
const getCategoryData = async () => {
  let { categorys } = await getCategory()
  categorysData.value = categorys
}

getCategoryData()
</script>

<template>
  <mobile-navigation v-if="isMobileTerminal" :data="categorysData" />
</template>

<style scoped></style>
