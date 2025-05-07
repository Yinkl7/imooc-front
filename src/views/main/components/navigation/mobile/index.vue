<script setup>
import { getCategory } from '@/api/category'

const getCategoryData = async () => {
  let res = await getCategory()
  console.log('res===== ', res)
}

getCategoryData()
</script>

<template>
  <div>我是移动端下的navigation</div>
</template>

<style scoped></style>
