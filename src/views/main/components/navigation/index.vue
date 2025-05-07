<script setup>
import { isMobileTerminal } from '@/utils/flexible';
import MobileNavigation from './mobile/index.vue'
</script>

<template>
  <mobile-navigation v-if="isMobileTerminal" />
</template>

<style scoped></style>
