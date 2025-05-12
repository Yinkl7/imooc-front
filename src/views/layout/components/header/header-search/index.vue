<script setup>
import { ref } from 'vue'
const searchVal = ref('')
</script>

<template>
  <div class="w-full">
    <m-search v-model="searchVal">
      <template #contentData> 测试数据 </template>
    </m-search>
  </div>
</template>

<style scoped></style>
