<script setup>
import headerCpn from './components/header/index.vue'
import mainCpn from './components/main.vue'
import floatingCpn from './components/floating.vue'
</script>

<template>
  <div class="h-screen">
    <header-cpn class="h-header"></header-cpn>
    <main-cpn class="h-main"></main-cpn>
    <floating-cpn></floating-cpn>
  </div>
</template>

<style scoped></style>
